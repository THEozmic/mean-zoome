import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {XlsxComperEnum} from "../../../enums/xlsx-comper.enum";
import { DatePipe } from '@angular/common';
import {DataAppService} from "../../../services/data-app.service";

@Component({
  selector: 'app-user-assets',
  templateUrl: './user-assets.component.html',
  styleUrls: ['./user-assets.component.scss']
})
export class UserAssetsComponent implements OnInit {
  public isNewAssetEnum =  this._dataAppService.isNewAssetEnum;
  public typeUserEnum = this._dataAppService.typeUserEnum;

  public strYes = 'כן';
  public strNo = 'לא';

  public user = {};
  public userId;
  //public Assets_list:any = [];
  public xlsxComperEnum = XlsxComperEnum;
  public retPage:string = 'userlist'; //assetslist

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, public _dataAppService: DataAppService, private _datePipe: DatePipe) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    this.retPage = this.route.snapshot.params['retPage'];
    this.getUser(this.route.snapshot.params['id']);
    //this.user['Assets_id_list']
  }

  getUser(id) {
    //this.Assets_list = [];
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };

    this.http.get('/user/account/' + id, httpOptions).subscribe(data => {
      this.user = data;

      /*if (this.user['Assets_id_list'].length > 0){
        let httpOptions = {
          headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
        };
        this.http.get('/assets/' + this.user['Assets_id_list'], httpOptions)
          .subscribe(dataAssets => {
            if (dataAssets['error']){

            } else {
              this.Assets_list = dataAssets;
            }

          }, (err) => {
            alert(err);
            //console.log(err);
          }
        );
      }*/


    });
  }

  public removeItem(assetsId:string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/assets/remove', {assetsId: assetsId}, httpOptions)
      .subscribe(res => {
          this.getUser(this.userId);
        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );
  }

  public GetTimeFormat(val, format): string{
    if (!val){
      return '';
    } else {
      //var datePipe = new DatePipe();
      //this.setDob = datePipe.transform(userdate, 'dd/MM/yyyy');
      return this._datePipe.transform(val, format);
    }
  }
  // | date : 'dd-MM-yyyy HH:mm'

  public sendMarketingMailTOUser(user_id, rule_id){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/user/sendMarketingMail', {userId: user_id, ruleId: rule_id}, httpOptions)
      .subscribe(res => {
          this.getUser(this.userId);
          alert(res['msg']);
        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );
  }

  public sendMailTOUser(userId){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/user/sendMail', {userId: userId}, httpOptions)
      .subscribe(res => {
          this.getUser(this.userId);
          alert(res['msg']);
        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );
  }

  public isAnalysis:boolean = false;
  public informationAnalysis(){
    this.isAnalysis = true;
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/user/informationAnalysis', {userId: this.userId}, httpOptions)
      .subscribe(res => {
          this.getUser(this.userId);

        setTimeout(() => {
          this.isAnalysis = false;
        }, 1000);


        //alert(res['msg']);
        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );
  }
  public saveChange(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/user/changeIsRegistered', {userId: this.userId, isRegistered: !this.user['isRegistered']}, httpOptions)
      .subscribe(res => {
          this.getUser(this.userId);
          //alert(res['msg']);
        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );
  }
}
