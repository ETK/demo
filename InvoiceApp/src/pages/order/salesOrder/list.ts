import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SqlService} from '../../../providers/sql-service';
import {UtilJson} from '../../../providers/util-json';
import {UtilService} from '../../../providers/util-service';
import {salesOrderDetail} from './detail';


@Component({
    selector: 'page-salesOrderList',
    templateUrl: 'list.html'
})

/*
*继承编辑页面基类
*/
export class salesOrderList {
    //设置明细页
    public detailPage:any;
    //设置页面标题
    public pageName:string ="单据列表";
    public pageData:any;
    tabName :string ="salesOrder";
    dtlTabName: string  = "salesOrderDtl";
    pageStatus:string = "";
    searchValue:string = "";
    openTag:any;

    constructor(public navCtrl:NavController,public navParams:NavParams,public sqlService:SqlService,public UtilJson:UtilJson,public utilService:UtilService) {
        //调用父级
        //super(navCtrl,data);
        this.initPage();
        this.pageData.searchValue="";
    }

    getData(){
        this.pageData.gridRows=[];
        let condition = "";
        if(this.pageData.searchValue){
            condition = " billNo like '%"+this.pageData.searchValue+"%' or customerName like '% "+this.pageData.searchValue+'% '
        }

        let p = this.sqlService.query(this.tabName,condition).then(data=>{
            if (data.res.rows.length > 0) {
                for (let i = 0, len = data.res.rows.length; i < len; i++) {

                    let row = data.res.rows.item(i);
                    row.materielList = [];
                    
                    this.sqlService.query(this.dtlTabName,"billNo = '"+ row.billNo+"'").then(dtlData=>{

                         if (dtlData.res.rows.length > 0) {
                             for (let i = 0, len = dtlData.res.rows.length; i < len; i++) {
                                 row.materielList.push(dtlData.res.rows.item(i));
                             }
                         }
                         this.pageData.gridRows.push(row);
                        
                     });

                
                }
            }
        }).catch(err=>{
            err
        });

    }

    search($event){
        this.getData();
    }

    initPage(){
        
        //调用父类方法
        //super.initPage();
        
        this.detailPage = salesOrderDetail;
        this.pageName = "单据列表";
        this.pageData = {
            gridRows:[]
        }

        this.getData();
        

        
    }

    _onDrag($event,row,index){
      let dargType = $event.additionalEvent||"up";
        //console.log(dargType);
        //console.log($event.eventType);
      switch(dargType){
        case "panleft":
          this._onDragLeft($event);
        break;
        case "panright":
          this._onDragRight($event);
        break;
        default:
            //this._onUp($event);
        break;
      }
      
    }

    getDargNode(target){
        if(target.hasAttribute("darg")){
            return target;
        }
        else{
            if(!target.parentElement){
                return null;
            }
            else{
                return this.getDargNode(target.parentElement);
            }
            
        }
    }

    _onUp($event){
        let tag = this.getDargNode($event.target);
        if(!tag) return;
        let max = -50;
        if(tag.offsetLeft<max/2){
            this._openBtnDelete(tag);
        }
        else{
            this._closeBtnDelete(tag);
        }
        
    }

    _onDragLeft($event){
        let me = this;
        let tag = me.getDargNode($event.target);
        if(!tag) return;
        let left = -50;
        left = $event.deltaX;

        //打开之前关闭上一个
        if(me.openTag && me.openTag != tag){
            me._closeBtnDelete(me.openTag,function(){
                //me.pageStatus="D";
                me.openTag = tag;
                //tag.style.left=left+"px";
            });
        }

        
        if(left<-50){
            left = -50;
            me.openTag = tag;
            me.pageStatus="D";
        }
        else{
            me.pageStatus="";
            me.openTag = null;
        }
        
        tag.style.left=left+"px";
        
        if($event.eventType>=4){
            this._onUp($event);
        }

        //console.log($event)
        //console.log($event.eventType)
    }

    _onDragRight($event){
        let tag = this.getDargNode($event.target);
        if(!tag) return;
        let left = 0;
        
        if($event.deltaX<-50) return;
        tag.nextElementSibling.style.zIndex="-1";

        if(tag.offsetLeft>=0){
            left = 0;
        }
        else if(tag.offsetLeft<-50){
            left = -50;
            if(this.openTag && this.openTag != tag){
                this._closeBtnDelete(this.openTag,function(){
                    this.pageStatus="D";
                    this.openTag = tag;
                });
            }
            
        }
        else{
            left = $event.deltaX;
        }
        tag.style.left=left+"px";

        if($event.eventType>=4){
            this._onUp($event);
        }
    }

    onClickRow($event,row,index){
        if(!this.pageStatus){
            let newData = UtilJson.copy(row);
            //调用上级组件方法
            this.editDetail(newData);
        }
        else{
            let tag = this.getDargNode($event.target);
            if(this.openTag){
                tag = this.openTag;
            }
            if(!tag) return true;
            this._closeBtnDelete(tag);
        }
    }

    _openBtnDelete(tag,callback?){
        let max = -50;
        let me =this;
        let left = tag.offsetLeft;
        setTimeout(function() {
            if(tag.offsetLeft>max){
                left-=5;
                tag.style.left=left+"px";
                me._openBtnDelete(tag,callback);
            }
            else{
                //打开之前关闭上一个
                if(this.openTag && this.openTag != tag){
                    me._closeBtnDelete(this.openTag,callback);
                }
                me.pageStatus="D";
                tag.nextElementSibling.style.zIndex="1";
                me.openTag = tag;
            }
        }, 10);

    }

    _closeBtnDelete(tag,callback?){
        let min = 0;
        let me =this;
        let left = tag.offsetLeft;
        tag.nextElementSibling.style.zIndex="-1";
        setTimeout(function() {
            if(tag.offsetLeft<min){
                left+=5;

                tag.style.left=left+"px";
                me._closeBtnDelete(tag,callback);
            }
            else{
                me.pageStatus="";
                me.openTag = null;
                if(typeof callback =="function"){
                    callback();
                }
            }
        }, 10);
    }

    _onDelItem($event,row,index){
        $event.preventDefault();
        $event.stopPropagation();
        if(row.billStatus!="制单"){
            this.utilService.showAlert("只能删除制单状态的单据！","",function(){

            });
            return;
        }
        //删除当前行
        this.sqlService.remove(this.tabName," id = "+row.id +" and billStatus ='制单' ").then(data=>{

            this.sqlService.remove(this.dtlTabName," billNo = '" +row.billNo+"' ").then(data=>{

                let index = this.pageData.gridRows.indexOf(row);
                this.pageData.gridRows.splice(index,1);
            });
        });

    }

    public addDetail(){
        //点击新增按钮
        this.navCtrl.push(this.detailPage, {parentObj:this, flag: 'add'});
    }

    public editDetail(record){
        this.navCtrl.push(this.detailPage, {parentObj:this,flag: 'edit', record: record});
    }
}