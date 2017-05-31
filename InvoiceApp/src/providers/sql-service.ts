import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite} from '@ionic-native/sqlite';

/*
 离线缓存通用服务，创建数据库, 增删改查方法封装
 wudefeng
 2017-04-28
 */
@Injectable()
export class SqlService {
    private _db: any;
    private win: any = window;

    constructor(public http: Http, public sqlite: SQLite) {
        if (this.win.sqlitePlugin) {
            this._db = sqlite.create({
                name: 'appdata.db',
                location: 'default'
            });
        } else {
            this._db = this.win.openDatabase("appdata.db", '1.0', 'database', 5 * 1024 * 1024);
        }
    }

    /**
     * 执行SQL语句，返回一个承诺,通过 .then(result=>{}).catch(err=>{})来处理结果
     * @param sql  sql语句
     * @param params sql参数值，可选参数，只有sql语句中用到 ? 传参方式时，params参数值才有效
     */
    execSql(sql: string, params = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this._db.transaction((tx) => {
                        tx.executeSql(sql, params,
                            (tx, res) => resolve({tx: tx, res: res}),
                            (tx, err) => reject({tx: tx, err: err}));
                    },
                    (err) => reject({err: err}));
            } catch (err) {
                reject({err: err});
            }
        });
    }

    /**
     *  保存对象，新增或更新
     * @param tableName  表名
     * @param obj  对象
     */
    save(tableName: string, obj: any): Promise<any> {
        let presql = this.getSaveSql(tableName, obj);
        return this.execSql(presql.sql, presql.params);
    }

    /**
     * 生成保存对象的SQL 返回:{sql:replace into table(x) values(?),params:[x_value]}
     * @param tableName 表名
     * @param obj  对象
     */
    getSaveSql(tableName: string, obj: any): any {
        let field = [], param = [], val = [];
        for (var key in obj) {
            field.push(key);
            param.push('?');
            val.push(obj[key]);
        }
        let sql = "replace into " + tableName + "(" + field.join(',') + ") values(" + param.join(',') + ')';
        return {sql: sql, params: val}
    }

    /**
     * 保存单据
     * @param masterTable 主表表名
     * @param mastObj  主表对象
     * @param dtlTable 从表表名
     * @param dtlObj  从表对象集 注意:从表所有对象的属性必须一样
     */
    saveBill(masterTable: string, mastObj: any, dtlTable: string, dtlObj: any[]): Promise<any> {
        //删除从表再重新添加
        return this.remove(dtlTable, "bill_no='" + mastObj.bill_no + "'").then(() => {

            return this.save(masterTable, mastObj).then(result => {

                if (dtlObj.length == 0) return;
                //处理从表,把所有从表记录拼接成一条sql:replace into table(x,y) values(?,?),(?,?)...
                let presql = this.getSaveSql(dtlTable, dtlObj[0]),
                    sql = presql.sql, param = sql.substr(sql.indexOf('values') + 6),
                    params = presql.params,
                    len = dtlObj.length, item;
                for (let i = 1; i < len; i++) {
                    item = dtlObj[i];
                    sql += "," + param;
                    for (var arr in item) {
                        params.push(item[arr]);
                    }
                }

                return new Promise((resolve, reject) => {
                    //主从表共用一个事务，如果从表失败，则主表会自动回滚
                    result.tx.executeSql(sql, params,
                        (tx, res) => resolve({tx: tx, res: res}),
                        (tx, err) => reject({tx: tx, err: err}));
                });

            })
        });
    }

    /**
     * 删除表中记录
     * @param tableName 表名
     * @param condition 条件，如果不传，删除全部
     */
    remove(tableName: string, condition: string = ''): Promise<any> {
        let sql = "delete from " + tableName;
        if (condition) {
            sql += " where " + condition;
        }
        return this.execSql(sql);
    }

    /**
     * 删除单据
     * @param masterTable 主表名
     * @param dtlTable 从表名
     * @param billNo 单据编号
     */
    removeBill(masterTable: string, dtlTable: string, billNo: string): Promise<any> {
        return this.remove(masterTable, "bill_no='" + billNo + "'").then(result => {
            return new Promise((resolve, reject) => {
                //主从表共用一个事务，如果从表失败，则主表会自动回滚
                result.tx.executeSql("delete from " + dtlTable + " where bill_no=?", [billNo],
                    (tx, res) => resolve({tx: tx, res: res}),
                    (tx, err) => reject({tx: tx, err: err}));
            });
        });
    }

    /**
     * 简单的单据审核
     * @param masterTable 主表名
     * @param billNo 单据号
     */
    auditBill(masterTable: string, billNo: string): Promise<any> {
        return this.execSql("update " + masterTable + " set bill_status = '20' where bill_no=?", [billNo]);
    }

    /**
     * 查询表中记录，通过then(data=>{data.res.rows.length>0来判断是否有返回记录})
     * @param tableName 表名
     * @param condition 条件，如果不传，返回全部
     */
    query(tableName: string, condition: string = ''): Promise<any> {
        let sql = "select * from " + tableName;
        if (condition) {
            sql += " where " + condition;
        }
        return this.execSql(sql);
    }

    /**
     * 查询表中记录,通过 .then(data=>{data.length>0来判断是否有返回记录})
     * @param tableName 表名
     * @param condition 过滤条件，如果不传此参考，返回表中全部记录
     */
    getRowsByTable(tableName: string, condition: string = ''): Promise<any> {
        return this.query(tableName, condition).then(data => {
            let items = [], len = data.res.rows.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    items.push(data.res.rows.item(i))
                }
            }
            return items;
        });
    }


    /**
     * 查询表中记录,通过 .then(data=>{data.length>0来判断是否有返回记录})
     * @param sql select 查询语句
     * @param param 过滤条件值，只有sql中用到 ? 传参方式，才需要此参数
     */
    getRowsBySql(sql: string, param = []): Promise<any> {
        return this.execSql(sql, param).then(data => {
            let items = [], len = data.res.rows.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    items.push(data.res.rows.item(i))
                }
            }
            return items;
        });
    }

    /**
     * 获取简单的编码，规则为前缀+[日期]+4位流水码 ,日期为可选，如果有按天复位流水码
     * @param ruleNo 规则编号（即前缀）
     * @param needDate 是否需要日期,默认为true
     */
    getCodeNo(ruleNo: string, needDate: boolean = true): Promise<any> {
        return this.getRowsBySql('select * from code_rule where rule_no=?', [ruleNo]).then(data => {
            let now = new Date(), currNo = 1,
                currDate = now.getFullYear() + ('00' + (now.getMonth() + 1)).slice(-2) + ('00' + now.getDate()).slice(-2),
                obj = {
                    rule_no: ruleNo,
                    curr_date: needDate ? currDate : "",
                    curr_no: currNo
                };

            if (data.length > 0) {
                let item = data[0];
                if (!needDate || item.curr_date == currDate) {
                    obj.curr_no = item.curr_no + 1;
                }
            }

            this.save('code_rule', obj).catch(err => {
                console.error('获取编号失败：', err);
            });
            return obj.rule_no + obj.curr_date + ('0000' + obj.curr_no).slice(-4);
        });
    }


    /**
     * 创建表结构
     */
    createTable() {

        let sqlArray = [];

        //用户表:用户编号，用户名称，密码，头像
        sqlArray.push({
            tableName: 'user', desc: '用户表',
            sql: `CREATE TABLE IF NOT EXISTS user (id integer primary key, user_no varchar, username varchar, password varchar,img varchar)`
        });

        // 商品表:商品编号、商品名称、基本单位、图片、采购价,成本价（采购价+管理成本), 销售价，最低安全库存，最高安全库存，条形码, 创建人，创建日期
        sqlArray.push({
            tableName: 'good', desc: '商品表',
            sql: `CREATE TABLE IF NOT EXISTS good (id integer primary key, good_no varchar,
      good_name varchar, unit varchar,img varchar,purchase_price float, cost_price float,
      sale_price float,mini_safe_num float,max_safe_num float,barcode varchar,creator varchar,create_time varchar)`
        });

        //客户表:客户编号、客户名称、客户简称、送货地址、联系人、电话、邮箱
        sqlArray.push({
            tableName: 'customer', desc: '客户表',
            sql: `CREATE TABLE IF NOT EXISTS customer (id integer primary key, customer_no varchar, customer_name varchar, customer_nickname varchar ,customer_addr varchar,contact varchar, phone varchar,email varchar)`
        });

        //仓库表: 仓库编码，仓库名称
        sqlArray.push({
            tableName: 'depot', desc: '仓库表',
            sql: `CREATE TABLE IF NOT EXISTS depot (id integer primary key, depot_no varchar, depot_name varchar)`
        });

        //供应商表:供应编号、供应名称、地址、联系人、电话、邮箱、公司
        sqlArray.push({
            tableName: 'supplier', desc: '供应商表',
            sql: `CREATE TABLE IF NOT EXISTS supplier (id integer primary key, supplier_no varchar, supplier_name varchar, supplier_addr varchar,contact varchar,phone varchar,email varchar,company varchar)`
        });

        //库存表(商品编号，仓库，数量)
        sqlArray.push({
            tableName: 'stk', desc: '库存表',
            sql: `CREATE TABLE IF NOT EXISTS stk (good_no varchar, store_no varchar, qty float,primary key(good_no,store_no))`
        });

        //进出仓明细（id,商品编号，仓库编号,进出仓标识，数量，交易单据，操作人员，操作日期）
        sqlArray.push({
            tableName: 'stk_in_out_dtl', desc: '进出仓明细',
            sql: `CREATE TABLE IF NOT EXISTS stk_in_out_dtl (id integer primary key, good_no varchar, store_no varchar,in_out_flag varchar, qty float,bill_no varchar,creator varchar,create_time varchar)`
        });

        //简单的编码规则，比如：SO201705090001(SO【常量】+20170509【日期】+0001【流水】)
        sqlArray.push({
            tableName: 'code_rule', desc: '简单的编码规则',
            sql: `CREATE TABLE IF NOT EXISTS code_rule(rule_no varchar primary key,curr_date varchar,curr_no integer)`
        });

        //采购订单表
        sqlArray.push({
            tableName: 'purchase_order', desc: '采购订单表',
            sql: `CREATE TABLE IF NOT EXISTS purchase_order (bill_no varchar primary key,  bill_status varchar,supplier_no varchar,delivery_date varchar,creator varchar,create_time  varchar)`
        });

        //采购订单明细
        sqlArray.push({
            tableName: 'purchase_order_detail', desc: '采购订单明细',
            sql: `CREATE TABLE IF NOT EXISTS purchase_order_detail (id integer primary key, bill_no varchar,good_no varchar,price varchar,order_qty float,rec_qty float default '0',finish_flag varchar default '0')`
        });

        //采购收货表
        sqlArray.push({
            tableName: 'purchase_rec', desc: '采购收货主表',
            sql: `CREATE TABLE IF NOT EXISTS purchase_rec (id integer primary key, bill_no varchar, create_time  varchar, creater  varchar,ref_bill_no varchar, bill_status varchar,supplier_no varchar,delivery_date varchar)`
        });

        //采购收货明细
        sqlArray.push({
            tableName: 'purchase_rec_detail', desc: '采购收货明细',
            sql: `CREATE TABLE IF NOT EXISTS purchase_rec_detail (id integer primary key, bill_no varchar,good_no varchar,price varchar,store_no varchar,delivery_qty number )`
        });

        //调拨单主表
        sqlArray.push({
            tableName: 'bl_transfer', desc: '调拨单主表',
            sql: `CREATE TABLE IF NOT EXISTS bl_transfer(bill_no varchar primary key,bill_status varchar,out_store_no varchar,in_store_no varchar,creator varchar,create_time varchar)`
        });

        //调拨单从表（id,单据编号，商品编号，数量)
        sqlArray.push({
            tableName: 'bl_transfer_dtl', desc: '调拨单主表',
            sql: `CREATE TABLE IF NOT EXISTS bl_transfer_dtl(id integer primary key, bill_no varchar , good_no varchar,qty float)`
        });

        //盘点录入单主表(单据编号，单据状态，仓库，制单人，制单日期)
        sqlArray.push({
            tableName: 'bl_stk_check', desc: '盘点单主表',
            sql: `CREATE TABLE IF NOT EXISTS bl_stk_check(bill_no varchar primary key,bill_status varchar, store_no varchar,creator varchar,create_time varchar)`
        });


        //盘点录入单从表（行号，单据编号，商品编号，库存数，盘点录入数，成本价)
        sqlArray.push({
            tableName: 'bl_stk_check_dtl', desc: '盘点单从表',
            sql: `CREATE TABLE IF NOT EXISTS bl_stk_check_dtl(id integer primary key,bill_no varchar,good_no varchar, stk_qty float,input_qty float,cost float)`
        });


        sqlArray.push({
            tableName: 'salesOrder', desc: '销售订单主表',
            sql: `CREATE TABLE IF NOT EXISTS salesOrder (id integer primary key,orderNo integer, billNo varchar, billStatus varchar, deliveryTime varchar,amount varchar,customerName varchar,merchandiser varchar,remarks varchar)`
        })

        sqlArray.push({
            tableName: 'salesOrderDtl', desc: '销售订单从表',
            sql: `CREATE TABLE IF NOT EXISTS salesOrderDtl (id integer primary key, billNo varchar, materielNo varchar, materielCode varchar, materielName varchar, status varchar, storeLen varchar)`
        })

        //执行SQL创建表
        sqlArray.forEach((obj, idx, items) => {
            this.execSql(obj.sql).then(() => {
                console.info(obj.desc, '表名:', obj.tableName, '创建成功');
            }).catch(err => {
                console.error("出错了", err.error.message);
            });
        });
    }

    /**
     * 删除系统中的表
     * @param creatTable 是否重新创建表
     */
    dropTable(creatTable: boolean = false) {
      /*  user,good,customer,depot,supplier,stk,stk_in_out_dtl,code_rule,purchase_orderpurchase_order_detail,purchase_rec，purchase_rec_detail，bl_transfer，bl_transfer_dtl，bl_stk_check,bl_stk_check_dtl，salesOrder，salesOrderDtl*/
        let tabName = ['user', 'good', 'depot', 'customer', 'supplier',
            'bl_stk_check', 'bl_stk_check_dtl', 'bl_transfer', 'bl_transfer_dtl',
            'stk', 'stk_in_out_dtl', 'code_rule', 'purchase_order', 'purchase_order_detail',
            'purchase_rec', 'purchase_rec_detail', 'salesOrder', 'salesOrderDtl'];
        //执行SQL删除表
        tabName.forEach((item, index, items) => {
            this.execSql('drop table if exists ' + item).then(() => {
                if (index + 1 == items.length) {
                    console.info("drop table success");
                    if (creatTable) {
                        this.createTable();
                    }
                }
            })
        })
    }

    /**
     * 重置数据库表
     */
    resetDB() {
        this.dropTable(true);
    }

    /**
     * 初始化用户，用户名:admin,密码:1
     */
    initUserData() {
        let user = {user_no: '0001', username: 'admin', password: '1'};
        let condition = "user_no='0001'";
        this.getRowsByTable('user', condition).then((data) => {
            if (data.length <= 0) {
                this.save('user', user).then(() => {
                    console.log("初始化用户成功!");
                });
            }

        });
    }

    initBaseData() {
        let sqlArray = [];
        sqlArray.push({
            desc: '仓库',
            sql: `insert into depot(depot_no,depot_name) values('1001','北京仓'),('2001','上海仓'),('3001','广州仓')`
        });

        sqlArray.push({
            desc: '商品',
            sql: `insert into good(good_no,good_name,purchase_price,cost_price,sale_price,mini_safe_num,max_safe_num) 
      values('DL487927Q','DL空调',499,600,1999,10,99),
            ('PQ389437T2','PQ电冰箱',520,800,2400,10,200),
            ('TI9347930L3','TI真空水杯',25,40,99,30,1000)`
        });

        sqlArray.push({
            desc: '客户',
            sql: `insert into customer(customer_no,customer_name,customer_addr,customer_nickname,phone,contact)
       values('CT3837T','人员的名义','中国汉东省','名义','13148574937','高老师'),
       ('CT2001T','上海欢乐颂','上海市X区59号','欢乐颂','18129374349','andy'),
       ('CT3001D','张三丰太极','武当山','张三丰','13599999909','张五侠')`
        });

        sqlArray.push({
            desc: '供应商',
            sql: `insert into supplier(supplier_no,supplier_name,supplier_addr,contact,phone,email) 
      values('VT0093T','天虹商城','深圳市','张先生','13599990000','zhang@126.com'),
      ('VT2001T','阿里巴巴','杭州','陆小凤','14793838292','liu999@gmail.com'),
      ('VT3001T','天空星小家电','深圳市','张小明','1812736637','zhang992@qq.com')`
        });

        //执行SQL创建表
        sqlArray.forEach((obj, idx, items) => {
            this.execSql(obj.sql).then(() => {
                console.info(obj.desc, '数据初始化成功');
            }).catch(err => {
                console.error("出错了", err.message);
            });
        });


    }


    /**
     * By PQ-20170503
     * @param sqlStr 自定义SQL语句,用于多表关联等复杂查询
     * @param condition 条件，如果不传，返回全部
     */
    queryBySql(sqlStr: string, condition: string = ''): Promise<any> {
        let sql = sqlStr;
        if (condition) {
            sql += condition;
        }
        return this.execSql(sql);
    }
}
