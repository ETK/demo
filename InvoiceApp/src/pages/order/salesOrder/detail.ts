import {Component} from '@angular/core';
import {NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {SqlService} from '../../../providers/sql-service';
import {UtilService} from '../../../providers/util-service';
import {FormGroup, FormControl} from '@angular/forms';
import {selectMateriel} from '../../../component/select-materiel';

/*
 Generated class for the AddItem page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})

export class salesOrderDetail {
    //当前绑定的数据源
    record:any;
    //页面状态 add or edit
    flag:string = "";
    //上级页面
    parentObj:any;
    //表单
    form:FormGroup;

    customerData:any;
    merchandiserData:any;
    materielSelectConfig:any;
    tabName :string ="salesOrder";
    dtlTabName: string  = "salesOrderDtl";

    constructor(public navCtrl:NavController, private sqlService: SqlService,public navParams: NavParams,public utilService:UtilService,public actionSheetCtrl: ActionSheetController) {
        //super(navCtrl,util,navParams);
    
        this.materielSelectConfig={
            loadUrl:"test",
            multiSelect:true,
            valueField:"materielNo",
            textField:"materielName",
            selectItems:[],
            onEvents:{
                onSelect:function(row,index,item){
                    row
                }
            }
        };
        this.materielSelectConfig.loadUrl="tesdt";

        this.initPage();
    }

    ngAfterViewInit() {
        //刷新界面
        this.bindData();
    }

    public initPage(){
        this.record = this.navParams.get('record')||{};
        this.flag = this.navParams.get('flag');
        this.parentObj = this.navParams.get('parentObj');
        this.materielSelectConfig.selectItems = this.record.materielList||[];
        this.materielSelectConfig.selectItem = this.materielSelectConfig.selectItems[0]||{};
        delete this.record.materielList;

        this.form = new FormGroup({
            billNo :new FormControl(),
            deliveryTime :new FormControl(),
            customerName :new FormControl(),
            merchandiser :new FormControl(),
            remarks :new FormControl(),
            materielNo:new selectMateriel(this.navCtrl,this.navParams)
        });


        this.customerData=[{
                customerNo:"01",
                customerName:"测试客户"
        }];

        this.merchandiserData=[{
            merchandiserNo:"01",
            merchandiser:"测试跟单"
        }];

        //super.initPage();
        
    }

    renderBill(record){

        let date = new Date();
        let year:any = date.getFullYear();
        let month:any = date.getMonth()+1;
        let day:any = date.getDate();
        //let hours:any = date.getHours();
        //let min:any = date.getMinutes();
        //let s:any = date.getSeconds();
        if(month<=9){
            month = "0"+month;
        }
        if(day<=9){
            day = "0"+day;
        }

        // var t =this.sqlService.execSql("drop table "+this.tabName).then(data=>{
        //     data
        // }).catch(err=>{
        //     err
        // })

        // var t =this.sqlService.execSql("drop table "+this.dtlTabName).then(data=>{
        //     data
        // }).catch(err=>{
        //     err
        // })
        let billD = "CO"+year+month+day;
        let billNo =  "CO"+year+month+day+"00000";
        let orderNo = 1;
        this.sqlService.query(this.tabName," billNo like '"+billD+"%' order by orderNo desc ").then(data=>{
            if (data.res.rows.length > 0) {
                orderNo += data.res.rows.item(0)["orderNo"];
            }

            billNo = billNo.substring(0,billNo.length-orderNo.toString().length);
            billNo += orderNo.toString();

            record.billNo = billNo;
            record.orderNo = orderNo;

        }).catch(err=>{
            err
        });
    }

    bindData(){

        
        if(this.flag=="add"){
            this.record = {
                    billStatus:"制单"
                }
            this.renderBill(this.record);
            
        }
    }
    

    save(){
        if(!this.form.valid ) return;
        this.sqlService.save(this.tabName,this.record).then(data=>{

            for(let i = 0;i<this.materielSelectConfig.selectItems.length;i++){
                let row = this.materielSelectConfig.selectItems[i];
                row.billNo = this.record.billNo;
                delete row._select;
                this.sqlService.save(this.dtlTabName,row).then(()=>{

                    if(i == this.materielSelectConfig.selectItems.length-1){
                        this.navCtrl.pop();
            
                        if(this.parentObj.getData){
                            this.parentObj.getData();
                        }
                    }
                    
                });
            }
            

            
            
        });
    }

    delete(){
        let me = this;

        me.utilService.showConfirm("是否确认删除?","",function(type){
            if(type==false) return;
            me.sqlService.remove(me.tabName," billNo = '"+me.record.billNo+"'").then(data=>{

                me.sqlService.remove(me.dtlTabName," billNo = '"+me.record.billNo+"'").then(data=>{

                    me.parentObj.getData();
                    me.navCtrl.pop();
                });
            });
        });
    }

    auditBillNo(){
        let me = this;
        me.sqlService.execSql("update "+me.tabName +" set billStatus='审核' where billNo='"+me.record.billNo+"' and billStatus='制单'  ").then(data=>{

            me.record.billStatus = "审核";
            me.utilService.showToast("审核成功！");
            if(this.parentObj.getData){
                this.parentObj.getData();
            }
        });
    }

    closeBillNo(){
        let me = this;
        me.sqlService.execSql("update "+me.tabName +" set billStatus='已关闭' where billNo='"+me.record.billNo+"' and billStatus='审核'  ").then(data=>{

            me.record.billStatus = "已关闭";
            me.utilService.showToast("关闭成功！");
            if(this.parentObj.getData){
                this.parentObj.getData();
            }
        });
    }

    createDeliveryBill(){

        let me = this;
        me.sqlService.execSql("update "+me.tabName +" set billStatus='备货中' where billNo='"+me.record.billNo+"' and billStatus='审核'  ").then(data=>{

            me.record.billStatus = "备货中";
            me.utilService.showToast("生成成功！");
            if(this.parentObj.getData){
                this.parentObj.getData();
            }
        });
        // let me = this;
        // me.sqlService.execSql("update "+me.tabName +" set billStatus='已关闭' where billNo='"+me.record.billNo+"' and billStatus='审核'  ").then(data=>{

        //     me.record.billStatus = "已关闭";
        //     me.utilService.showToast("关闭成功！");
        // });
    }

    presentPopover($event){
        let me= this;
        let buttons = [];

        let status = this.record.billStatus;

        switch(status){
            case "制单":
                 buttons.push({
                    text: '审核',
                    role: '审核',
                    handler: () => {
                        me.auditBillNo();
                    }
                });
            break;
            case "审核":
                buttons.push({
                    text: '关闭单据',
                    role: '关闭单据',
                    handler: () => {
                        this.closeBillNo();
                    }
                },{
                    text: '生成发货单',
                    handler: () => {
                        this.createDeliveryBill();
                    }
                });
            break;
            case "已关闭":
                buttons.push({
                    text: '恢复单据',
                    role: '恢复单据',
                    handler: () => {
                        
                    }
                });
            break;
        }

        let actionSheet = this.actionSheetCtrl.create({
            title: '单据处理',
            buttons: buttons
        });
        actionSheet.present();
    }
}


