import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SqlService } from './sql-service';

/*
  Generated class for the CustomerService provider.

  wudefeng
  2017-04-28
*/
@Injectable()
export class CustomerService {

  private tableName: string = "customer";

  constructor(public http: Http, public sqlHelp: SqlService) {
    console.log('Hello CustomerService Provider');
  }

  getAll(condition: string = ""): Promise<any> {
    return this.sqlHelp.query(this.tableName, condition);
  }

  save(obj: any): Promise<any> {
    return this.sqlHelp.save(this.tableName, obj);
  }

  remove(condition:string=""):Promise<any> {
    return this.sqlHelp.remove(this.tableName, condition);
  }

}
