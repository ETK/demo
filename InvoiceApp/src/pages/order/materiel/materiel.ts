import {Component,trigger, state, style,
  animate, transition} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import {UtilJson} from '../../../providers/util-json';

@Component({
    selector: 'page-materiel',
    templateUrl: 'materiel.html'
    ,
    animations:[
        trigger('filterPanel', [
        // state 控制不同的状态下对应的不同的样式
        state('openFilter' , style({ left: "15%" })),
        state('closeFilter', style({ left:"100%" })),
        transition('openFilter => closeFilter', animate('250ms')),
        // transition 控制状态到状态以什么样的方式来进行转换
        transition('closeFilter => openFilter', animate('250ms')),
        
        ])
    ]
})

export class materiel {

    multiSelect:boolean;
    parentObj:any;
    //加载数据的URL
    loadUrl:string;
    //静态数据
    rows:Array<Object>;;
    //事件
    public onEvents:{
        onSelect(row,index,item):void,
        onBeforeSelect(row,index,item):boolean,
        onLoad(data):void,
        onBeforeLoad(params):boolean
    }

    pageData:any = {
        filterStatus:"closeFilter",
        filters:{
            divisionNos:[],
            brandNos:[]
        },
        selection:{
            divisionNo:{},
            brandNo:{}
        },
        divisionNoData:[],
        brandNoData:[]
    }
    //返回当前选中的数据
    //当前绑定数据
    data:Array<Object>;
    //查询参数
    params:any;

    private selectItem:Object = {};
    private selectItems:Array<Object> = [];
    

    constructor(public navCtrl:NavController, private utilService: UtilService,public navParams: NavParams) {
        this.initPage();
    }

    ngAfterViewInit() {
        //刷新界面
        this.bindData();
        this.selectItems = [];
    }

    //初始化
    initPage(){
        this.parentObj = this.navParams.get('parentObj');
        this.onEvents = this.navParams.get('onEvents');
        this.multiSelect = this.navParams.get('multiSelect');
    }

    //绑定数据
    bindData(){
        this.rows = [{
            materielNo:"CC00000001",
            materielCode:"AMX00012000",
            materielName:"测试",
            status:"成品",
            storeLen:"1002",
            divisionNo:"D01",
            brandNo:"J01"
        },{
            materielNo:"CC000000011",
            materielCode:"AMX000120211201",
            materielName:"测试1",
            status:"成品",
            storeLen:"100",
            divisionNo:"D01",
            brandNo:"J01"
        },{
            materielNo:"CC000000013",
            materielCode:"AMX000120211203",
            materielName:"测试3",
            status:"成品",
            storeLen:"100",
            divisionNo:"D01",
            brandNo:"J01"
        },{
            materielNo:"CC0000000114",
            materielCode:"AMX0001202112004",
            materielName:"测试4",
            status:"成品",
            storeLen:"100",
            divisionNo:"D02",
            brandNo:"J01"
        },{
            materielNo:"CC0000000115",
            materielCode:"AMX0001202112005",
            materielName:"测试5",
            status:"成品",
            storeLen:"100",
            divisionNo:"D01",
            brandNo:"M01"
        },{
            materielNo:"CC0000000116",
            materielCode:"AMX0001202112006",
            materielName:"测试6",
            status:"成品",
            storeLen:"100",
            divisionNo:"D02",
            brandNo:"M01"
        }];

        this.pageData.divisionNoData=[{
            divisionName:"中端一部",
            divisionNo:"D01"
        },{
            divisionName:"中端二部",
            divisionNo:"D02"
        }];

        this.pageData.brandNoData=[{
            brandName:"真美诗",
            brandNo:"J01"
        },{
            brandName:"妙丽",
            brandNo:"M01"
        }]

        this._load();
    }

    //加载数据
    _load(){
        if(this.onEvents && this.onEvents.onBeforeLoad){
            if(this.onEvents.onBeforeLoad(this.params)==false) return;
        }
        
        if(this.loadUrl){
            this.utilService.httpGet(this.loadUrl,this.params,1000,true,function(data){
                this.data = data;
                this.onEvents.onLoad(data);
            });
        }
        else if(this.rows && this.rows.length>0){

            this.data = UtilJson.copy(this.rows);
        }
        
    }

    //单击行
    _onSelect($event,index,row){
        if(this.onEvents.onBeforeSelect){
            if(this.onEvents.onBeforeSelect(row,index,this.selectItems) == false) return;
        }

        //当前行未放到选中列表
        if(!row._select){
            row._select = true;
            this.selectItem = row;
            this.selectItems.push(row)
        }
        else{
            delete row._select;
            var sIndex = this.selectItems.indexOf(row);
            //删除已选中
            if(sIndex>=0){
                this.selectItems.splice(sIndex,1);
            }
            //默认最后选中项
            if(this.selectItems.length>0){
                this.selectItem = this.selectItems[this.selectItems.length-1];
            }
            else{
                this.selectItem = null;
            }
            
        }

        if(this.multiSelect){
            
        }

        
        if(this.onEvents.onSelect){
            this.onEvents.onSelect(row,index,this.selectItems);
        }
    }

    //点击确定按钮
    _onBtnOk($event){
        //执行上级回调方法
        if(this.parentObj && this.parentObj.returnValue){
            this.parentObj.returnValue(this.selectItem,this.selectItems);
            //返回上级
            this.navCtrl.pop()
        }
    }

    //搜索
    _search($event){
        this._load();
    }

    //点击行
    _onClickRow($event,row,index){
        //实现选中
        this._onSelect($event,index,row);
    }

    _onCloseFilter(){
        this.pageData.filterStatus = "closeFilter";
    }

    _onOpenFilter(){
        this.pageData.filterStatus = "openFilter";
    }

    _onBtnCanel(){
        this.pageData.filterStatus = "closeFilter";
    }

    _onBtnFilter(){
        let me = this;
        let filterRow = this.rows;

        if(me.pageData.filters.divisionNos[0]){
            filterRow = filterRow.filter(function(item){
                return item["divisionNo"] == me.pageData.filters.divisionNos[0].divisionNo;
            });
        }
        
        if(me.pageData.filters.brandNos[0]){
            filterRow = filterRow.filter(function(item){
                return item["brandNo"] == me.pageData.filters.brandNos[0].brandNo;
            });
        }

        this.data = filterRow;
        this.pageData.filterStatus = "closeFilter";
    }

    onBtnSingleSelect(item,filters,selectionName){
        let selection = this.pageData.selection[selectionName];
        item.isSelect = !item.isSelect;

        let index = filters.indexOf(item);
        //实现单选
        if(item.isSelect && item != selection){
            let sIndex = filters.indexOf(selection);

            if(sIndex>=0){
                selection.isSelect = false;
                filters.splice(sIndex,1);
            }
        }

        if(item.isSelect && index<0){
            filters.push(item);
            //记录当前选中
            this.pageData.selection[selectionName] = item;
        }
        else if(!item.isSelect && index>=0){
            filters.splice(index,1);
        }
    }
}