import {Component} from '@angular/core';
import {IonicPage,NavController, NavParams} from 'ionic-angular';
import {UtilService} from '../../../providers/util-service';
import {SqlService} from "../../../providers/sql-service";

/*
 Generated class for the UserList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-user-list',
    templateUrl: 'user-list.html'
})
export class UserListPage {
    items: any;
    placeholder: string;
    myInput: string;
    totalData: any;

    constructor(public navCtrl: NavController,
                private utilService: UtilService,
                private sqlService: SqlService,
                public navParams: NavParams) {
        this.placeholder = "请输入关键字";
        this.myInput = "";
        this.getData();
    }

    getData() {
        this.sqlService.query('user').then((data) => {
            this.totalData = this.utilService.sqliteToArrqy(data.res.rows);
            this.items = this.totalData;
        }).catch((err) => {
            console.error(err);
        });
    }

    addItem() {
        let inputs = [
            {name: 'userno', placeholder: '请输入用户编号', type: 'number'},
            {name: 'username', placeholder: '请输入用户名'}
        ];
        this.utilService.showPrompt('', '新增用户', inputs, ((data) => {
            if(!data.userno||!data.username){
                data['flag']=false;
                this.utilService.showToast('用户编号和用户名不能为空');
            }else{
                let isRepeat:boolean=false;
                for(let item of this.totalData){
                    if(item.user_no==data.userno){
                        isRepeat=true;
                        break;
                    }
                }
                if(isRepeat){
                    data['flag']=false;
                    this.utilService.showToast('此编号用户已存在');
                }else{
                    this.add(data);
                }


            }

        }))
    }

    add(data){
        let obj={
            'user_no':data.userno,
            'username':data.username,
            'password':'1',
            'img':''
        };
        this.sqlService.save('user',obj).then(()=>{
            this.getData();
        }).catch((err)=>{
            console.error(err);
        });
    }

    deleteItem(item) {
        this.utilService.showConfirm('确定要删除此条数据?', '提示', () => {
            let condition = "id='" + item.id + "'";
            this.sqlService.remove('user', condition).then(() => {
                this.getData();
            }).catch((err) => {
                console.error(err);
            })
        });
    }

    onInput(){
        let array: any = [];
        for (let data of this.items) {
            if (data.user_no.indexOf(this.myInput) >= 0 || data.username.indexOf(this.myInput) >= 0) {
                array.push(data);
            }
        }
        //console.log(array);
        this.utilService.refreshUI(() => {
            this.items = array;
        });
    }
    onClear() {
        this.items = this.totalData;
    }

}
