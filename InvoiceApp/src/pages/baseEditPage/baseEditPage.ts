import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {UtilService} from '../../providers/util-service';


@Component({
    selector: 'page-baseEditPage',
    templateUrl: 'baseEditPage.html'
})

export  class baseEditPage{
    //明细页
    public detailPage:any;
    public pageName:string ="页面名称";
    public gridConfig:any;
    public pageData:any;
    //定义变量，用于传递当前组件到子组件
    public parentObj:any;
    public gridEvents:any;

    constructor(public navCtrl:NavController,public utilService:UtilService) {
        this.initPage();
    }

    ngAfterViewInit() {
        //保存当前组件对象
        this.parentObj = this;
        this.bindData();
    }

    initPage(){
        this.gridConfig={
            
        };
    }

    getItems($event){

    }

    bindData(){
        this.utilService.loader
    }

    //点击行事件
    onClickRow($event,row,index){
        //调用上级组件方法
        this.parentObj.editDetail(row);
    }

    onClickCell($event,field,value,row,celIndex,rowIndex){
        //alert(rowIndex);
    }

    public addDetail(){
        //点击新增按钮
        this.navCtrl.push(this.detailPage, {parentObj:this, flag: 'add'});
    }

    public editDetail(record){
        this.navCtrl.push(this.detailPage, {parentObj:this,flag: 'edit', record: record});
    }
}