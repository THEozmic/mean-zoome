import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {XlsxComperService} from "../../../services/xlsx-comper.service";
import {User} from "../../../classes/user";
import {XlsxComperEnum} from "../../../enums/xlsx-comper.enum";
import {DataAppService} from "../../../services/data-app.service";
@Component({
  selector: 'app-assets-create',
  templateUrl: './assets-create.component.html',
  styleUrls: ['./assets-create.component.scss']
})
export class AssetsCreateComponent implements OnInit {
  @ViewChild("editor") editorChild: ElementRef;
  public typeUserEnum = this._dataAppService.typeUserEnum;
  public isNewAssetEnum = this._dataAppService.isNewAssetEnum;

  public assets:any = {
    RequestDate: Date.now(),
    isNewAsset: false
  };

  public xlsxComperEnum = XlsxComperEnum;
  public owner_id;
  public AnalysisDate:string = ''; // ='מחפש להשכרה 5 חדרים בפלורטין תל אביב עד 8000 ';
  public msgsDataSP:any[]=[];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private _XlsxComperService: XlsxComperService,
              private _dataAppService: DataAppService, public _location: Location) {
    this.msgsDataSP.push({
      msg: 'היי חברה אני עוז הבן שלנו וגוני הכלב מחפשים לשכור דירת-גן 4_חדרים במערב_העיר ראשון-לציון אם אפשרות לשותפים עד 5,000_ש"ח',
      name: 'עוז צור',
      email: 'yozchoor@gmail.com',
      phone: '052-6515858',

      isMarried: 'MARRIED',
      spousesName: 'עוז',
      numChildren: 1,

      data:{
        typeUser: 'RENTING',
        city: 'ראשון-לציון',
        zone: 'במערב העיר',
        assetType: 'דירת-גן',
        budget: '5,000 ש"ח',
        numRooms: '4 חדרים',
        isNewAsset: 'false'
      },
      listWordTo:['ראשון-לציון' , 'במערב_העיר', 'לשכור', 'דירת-גן', '5,000_ש"ח', '4_חדרים']
    });
    this.msgsDataSP.push({
      msg: 'מפנים את דירתנו המקסימה ברחוב אפשטיין_14 חולון הדירה מתאימה_לזוג_שותפים 2.5_חדרים ניתן לקבל פרטים מ יוסי_דרורי טל-052-62185984 email yosidrori@gmail.com',
      name: 'יוסי דרורי',
      email: 'yosidrori@gmail.com',
      phone: '052-62185984',
      isMarried: 'SINGLE',
      spousesName: '',
      numChildren: 0,
      dateOfBirth: new Date(1985, 4, 5),
      data:{
        typeUser: 'FOR_RENT',
        city: 'חולון',
        zone: 'אפשטיין 14',
        assetType: 'מתאימה לזוג שותפים',
        budget: '',
        numRooms: '2.5 חדרים',
        isNewAsset: 'false'
      },
      listWordTo:['אפשטיין_14', 'חולון', 'מתאימה_לזוג_שותפים', 'יוסי_דרורי', '2.5_חדרים' , 'yosidrori@gmail.com', 'טל-052-62185984']
    });
    this.msgsDataSP.push({
      msg: 'למשפחתי בעלת 4 נפשות דרוש דירה לקנייה 3.5_חדרים חדשה באזור צפון תל_אביב עדיפות לדירת_גג_חניה_חובה יעקב_ואסתר_ישראלי עד 3,000,000_ש"ח',
      name: 'יעקב ישראלי',
      email: 'yakovisraely@gmail.com',
      phone: '054-9515874',
      isMarried: 'MARRIED',
      spousesName: '',
      numChildren: 4,
      data:{
        typeUser: 'TO_BUY',
        city: 'תל אביב',
        zone: 'צפון',
        assetType: 'דירת גג חניה חובה',
        budget: '3,000,000 ש"ח',
        numRooms: '3.5 חדרים',
        isNewAsset: 'true'
      },
      listWordTo:['לקנייה', 'דירת_גג_חניה_חובה', 'יעקב_ואסתר_ישראלי', 'צפון', 'חדשה', '3,000,000_ש"ח' , '3.5_חדרים']
    });
    this.msgsDataSP.push({
      msg: 'מוכרת את דירתי בחיפה שכונת_הדר 5_חדרים גדולה פינוי_25-5-2018 מחיר 1,700,000_ש"ח',
      name: 'נוי דדון',
      email: 'noy@gmail.com',
      phone: '050-6715936',
      isMarried: 'WIDOWER',
      spousesName: '',
      numChildren: 2,
      dateOfBirth: new Date(1965, 9, 15),
      investmentsAbroad: 'YES',
      data:{
        typeUser: 'SALE',
        city: 'חיפה',
        zone: 'שכונת הדר',
        assetType: 'פינוי 25-5-2018',
        budget: '1,700,000 ש"ח',
        numRooms: '5 חדרים',
        isNewAsset: 'false'
      },
      listWordTo:['1,700,000_ש"ח', 'פינוי_25-5-2018', '5_חדרים', 'שכונת_הדר', 'בחיפה', 'מוכרת']
    });
    /*this.msgsDataSP.push({
      msg: '',
      name: '',
      email: '',
      phone: '',
     data:{
     typeUser: '',
     city: '',
     zone: '',
     assetType: '',
     budget: '',
     numRooms: '',
     isNewAsset: ''
     }
    });*/
  }

  ngOnInit() {
    this.owner_id = this.route.snapshot.params['id'];
  }
  public loadingApp:boolean = false;
  public SaveAnalysisDateAssets(){

    this.loadingApp = true;
    var temp = this.msgsDataSP[this.numNext];

    var _splWord = temp.msg.split('_');
    if (_splWord.length > 1){
      _splWord = _splWord.join(' ');
    }

    var data = {
      name: temp.name,
      phone: temp.phone,
      email: temp.email,

      isMarried: temp.isMarried,
      spousesName: temp.spousesName,
      numChildren: temp.numChildren,
      dateOfBirth: temp.dateOfBirth,
      revenue: temp.revenue,
      investmentsAbroad: temp.investmentsAbroad,



      isAddAsset: true,

      RequestDate: new Date().toDateString(),
      msg: _splWord,
      typeUser: temp.data.typeUser,
      city: temp.data.city,
      zone: temp.data.zone,
      assetType: temp.data.assetType,
      budget: temp.data.budget,
      numRooms: temp.data.numRooms,
      isNewAsset: temp.data.isNewAsset
    };

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/user', data, httpOptions)
      .subscribe(res => {
         this.clearDataSP();
        setTimeout(() => {
          this.loadingApp =false;
        }, 2000);

        }, (err) => {
          this.loadingApp = false;
          alert(err);
          //console.log(err);
        }
      );
  }

  public wordList:any[]=[];
  AnalysisDateAssets(){


    /*this.assets.RequestDate = new Date().toDateString();
    this.assets.typeUser = 'RENTING';
    this.assets.city = "תל אביב";
    this.assets.zone = "בפלורטין";
    this.assets.assetType = "דירה";
    this.assets.budget = "8000";
    this.assets.numRooms = "5";*/
    this.wordList= [];
    var msg = this.msgsDataSP[this.numNext].msg;
    var sl = msg.split(' ');
    var msgSPdata = this.msgsDataSP[this.numNext].listWordTo;

    for(var idx in sl){
      var temp = {
        word: '',
        isColorWord: false
      };

      temp.word = sl[idx];
      var _splWord = temp.word.split('_');
      if (_splWord.length > 1){
        temp.word = _splWord.join(' ');
      }
      temp.word += ' ';

      temp.isColorWord = msgSPdata.includes(sl[idx]);

      this.wordList.push(temp);
    }
  }

  public GetText(str){
    if (this.numNext == -1){
      return '';
    }

    var res = '';
    var sl = str.split(' ');
    var msgSPdata = this.msgsDataSP[this.numNext].listWordTo;
    for(var idx in sl){
      var word = sl[idx];
      var _splWord = word.split('_');
      if (_splWord.length > 1){
        word = _splWord.join(' ');
      }
      res += word + ' ';
      /*if (msgSPdata.includes(sl[idx])){
        res += '<span style="color: yellow;">' + word + '</span>';
      } else {
        res += word;
      }*/
    }

    this.editorChild.nativeElement.innerHTML = res;
  }


  createAssets(data) {
    this.loadingApp = true;
    if (this.owner_id != '-1'){
      data.owner_id = this.owner_id;
    }



    data.typeUser = this.typeUserEnum[data.typeUser];
    data.isNewAsset = this.isNewAssetEnum[data.isNewAsset];

    if (this.editorChild.nativeElement.innerHTML){
      data.msg = this.editorChild.nativeElement.innerHTML;
    }
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };

    this.http.post('/assets', data, httpOptions)
      .subscribe(res => {
        //this._location.back();
        setTimeout(() => {
          this.loadingApp =false;
          this._location.back();
          /*if (this.owner_id != '-1'){
            this.router.navigate(['/user-assets', this.owner_id, 'assetslist']);
          } else {
            this._location.back();
          }*/
        }, 2000);


        }, (err) => {
        this.loadingApp =false;
          alert(err);
          //console.log(err);
        }
      );
  }

  private clearDataSP(){
    this.numNext = -1;
    this.wordList= [];
    this.editorChild.nativeElement.innerHTML = '';
  }
  public numNext:number = -1;
  exportSP(){
    this.wordList= [];
    var len = this.msgsDataSP.length;
    this.numNext++;
    this.numNext = this.numNext % len;

    this.GetText(this.msgsDataSP[this.numNext].msg);
    //this.AnalysisDate = this.msgsDataSP[this.numNext].msg;
  }

  file:File;
  incomingfile(event)
  {
    this.file = event.files[0];
    this.Upload();
  }

  Upload() {
    this._XlsxComperService.Action(this.file, (data:User[]) =>{
      this.saveAllUser(data);
    });
  }

  private saveAllUser(data:User[]) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/user/list', data, httpOptions)
      .subscribe(res => {
          //let id = res['_id'];
          this.router.navigate(['/assets-list']);
        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );
  }

}
