import {Component,  Input,Output,forwardRef} from '@angular/core';
import {NavController, NavParams,} from 'ionic-angular';
import {FormControl,NG_VALUE_ACCESSOR } from '@angular/forms';

import {UtilJson} from '../providers/util-json';
//引入模块
import {materiel} from '../pages/order/materiel/materiel';


export const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => selectMateriel),
  multi: true
};

const noop = () => {
};

@Component({
  selector: 'select-materiel',
  templateUrl: 'select-materiel.html',
  //encapsulation: ViewEncapsulation.None,
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})


//
export class selectMateriel extends FormControl {

    private _focused: boolean = false;
    private _disabled: boolean = false;
    private _readonly: boolean = false;
    private _required: boolean = false;
    private _value:any;
    private _defaultValue:any;

    @Input() valueField:string;
    @Input() textField:string;
    //多选
    @Input() multiSelect:boolean = false;
    @Input() selectControl:string;
   //加载数据的URL
    @Input() loadUrl:string;
    //静态数据
    @Input() rows:Array<Object>;
    //事件
    @Input() onEvents:{
        onSelect(row,index,item):void,
        onBeforeSelect(row,index,item):boolean,
        onLoad(data):void,
        onBeforeLoad(params):boolean
    }

    @Input() title:string;

    @Input() selectName:string;

    //返回当前选中的数据
    @Input() @Output() selectItem:Array<Object>;
    @Input() @Output() selectItems:Array<Object>;
    @Input() @Output() data:Array<Object>;

    private _showList:Boolean = true;
    private _onChangeCallback: (_: any) => void = noop;
    private _onTouchedCallback: () => void = noop;
    params:any;
    pageName:string ="物料选择";
    
    constructor(public navCtrl:NavController,public navParams: NavParams,public utilJson?:UtilJson) {
        super();
    }

    ngAfterViewInit() {
        //刷新界面
        this.bindData();
    }

    initPage(){
        
    }

    bindData(){
        this.setSelectData();
    }

    setSelectData(){
        let vs = [];
        if(this.multiSelect){
            for(let i=0;i<this.selectItems.length;i++){
                vs.push(this.selectItems[i][this.valueField]);
            }
        }
        else{
            vs = this.selectItem?[this.selectItem[this.valueField]]:[this._value];
        }
        this._value = vs.join(',');
        this.value = this._value;
        //this._onChangeCallback(vs.join(','));
        //this.setValue(vs.join(','));
    }

    get value(): any {
        return this._value;
    };

    @Input() set value(v: any) {
        this._value = v;
        this._required = true;
        // 触发值改变事件，冒泡给父级
        this._onChangeCallback(v);
    }

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value) {
        this._required = value;
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value) {
        
        this._disabled = value;
    }

    @Input()
    get readonly(): boolean {
        return this._readonly;
    }
    set readonly(value) {
        this._readonly = value;
    }

    setValue(value,e?){
        if (value !== this._value) {
            //调用上级设置值方法（）
            super.setValue(value,e);
            //this._value = value;
            // 触发值改变事件，冒泡给父级
            this._onChangeCallback(value);
        }
    }


    writeValue(value: any) {
        this._value = value;
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    };

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    _onClick(){
        if(this.readonly || this.disabled) return;
        this.navCtrl.push(materiel, {
            parentObj:this,
            onEvents:this.onEvents,
            loadUrl:this.loadUrl,
            multiSelect:this.multiSelect
        });
    }

    returnValue(selectItem,selectItems){
        UtilJson.extendValue(this.selectItem,selectItem) ;

        this.selectItems.splice(0,this.selectItems.length);

        UtilJson.extendValue(this.selectItems,selectItems) ;
        let vals = [];
        if(this.multiSelect){
            for(let i=0;i<this.selectItems.length;i++){
                vals.push(this.selectItems[i][this.valueField]);
            }
        }
        else{
            vals.push(selectItem[this.valueField]);
        }
        
        this.setValue(vals.join(','));
        //console.log(data);
    }
}

