import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SqlService } from './sql-service';


@Injectable()
export class SupplierService {

  private tableName: string = "supplier";

  constructor(public http: Http, public sqlHelp: SqlService) {
    console.log('Hello SupplierService Provider');
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
