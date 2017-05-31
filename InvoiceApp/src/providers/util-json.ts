import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the CustomerService provider.

  wudefeng
  2017-04-28
*/
@Injectable()
export class UtilJson {

  /**
   * 拷贝当前对象，返回新对象
   */
  static copy(value){
     //test
    let me = this;
    let newValue;
    if(typeof value !="object") return newValue;
    
    if(value ==null || value == undefined) return value;

    //判断当前传入值是否为数组
    if(Array.isArray(value)){
      newValue = [];
    }
    else{
      newValue = {};
    }
    //遍历
    for(let item in value){
        let v = value[item];
        //判断当前节点是否为对象
        if(typeof v ==="object"){
          newValue[item] = me.copy(v);
        }
        else{
          newValue[item] = v;
        }

    }
    return newValue;

  }

  /**
   * 对象转换为字符串
   */
  static toStringify(json){
    return JSON.stringify(json);
  }

  /**
   * 字符串转换为对象
   */
  static toJson(txtJson){
    return JSON.parse(txtJson);
  }

  /**
   * 设置当前对象值
   */
  static setValue(value,setValue){
    let me = this;
    if(typeof value !="object") return value = setValue;

    //移除原对象属性
    function checkValue(value,setValue){
        //遍历原对象
        for(let item in value){
              let sv = setValue[item];
              //新值不存在时删除属性
              if(sv == undefined){
                  delete value[item];
              }
              //遍历所有属性
              if(typeof value[item] === "object" && (sv!=undefined || sv!=null)){
                 checkValue(value[item],sv);
              }
        }
    };
    
    checkValue(value,setValue);

    //遍历将要设置的值
    for(let item in setValue){
        let sv = setValue[item];
        let v = value[item];

        if(typeof v === "object"){
            me.setValue(value[item],sv);
        }
        else{
          value[item] = sv;
        }
    } 
  }

  /**
   * 扩展当前对象
   */
  static extendValue(value,extendValue){
    let me = this;
    if(typeof value !="object") return value;

    for(let item in extendValue){
        let sv = extendValue[item];
        let v = value[item];

        if(typeof v === "object"){
            me.extendValue(value[item],sv);
        }
        else{
          value[item] = sv;
        }
    }
  }

}