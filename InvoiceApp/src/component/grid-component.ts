import {Component, Input} from '@angular/core';




@Component({
  selector: 'grid-component',
  templateUrl: 'grid-component.html'
  // ,
  // animations:[
  //   trigger('gridRowHandler', [
  //     // state 控制不同的状态下对应的不同的样式
  //     state('click' , style({ color: "#000000" })),
  //     state('dragLeft', style({ color:"#ffffff" })),
  //     // transition 控制状态到状态以什么样的方式来进行转换
  //     transition('dragLeft => click', animate('600ms')),
  //     transition('click => dragLeft', animate('300ms')),
  //   ])
  // ]
})

export class gridComponentControl{

    //网格列
    @Input() gridColumns: Array<Object>;

    @Input() gridUrl:string ;

    @Input() gridRows:Array<Object>;

    @Input() gridEvents:{
      onDragLeft:Function,
      onDragRight:Function,
      onClickRow:Function,
      onClickCell:Function
    };

    

    //@Input() onClickRow:Function;
    //@Input() onClickCell:Function;

    //@Input() onDragLeft:Function;
    //@Input() onDragRight:Function;

    _gridRowHandler:String ="click";
    _status: String="";

    @Input() parentObj:any;

    constructor() {
      
    }

    initComponent(){

    }

    _onDrag($event,row,index,data){
      let dargType = $event.additionalEvent;

      switch(dargType){
        case "panleft":
          this._onDragLeft($event);
          if(this.gridEvents && this.gridEvents.onDragLeft){
              
              this.gridEvents.onDragLeft($event,row,index,data);
          }
        break;
        case "panright":
          this._onDragRight($event);
          if(this.gridEvents && this.gridEvents.onDragRight){
              this.gridEvents.onDragRight($event,row,index,data);
          }
        break;
      }
      
    }

    _onDragLeft($event){
      //this._gridRowHandler = "dragLeft";

      //animate(1,style(""));
      //this._status="dragLeft";

      $event.target.style.left=$event.deltaX+"px";

    }

    _onDragRight($event){

    }


    _mouseup($event){
      //this._status="click";
    }

    _onClickRow($event,row,index){
        if(this._status=="click"){
            this._gridRowHandler = "click";
        }
        else{
          this._status="click";
        }
        
        //this.onClickRow.call(this,$event,row,index);
    }

    _onClickCell($event,field,value,row,celIndex,rowIndex){
      //this.onClickCell.call(this,$event,field,value,row,celIndex,rowIndex);

    }
}
