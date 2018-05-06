import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import {XlsxComperEnum} from "../../../enums/xlsx-comper.enum";
import {DataAppService} from "../../../services/data-app.service";

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  
 /*public firstHead:string = this._dataAppService.isNewAssetEnum.First;
  public secHead:string = this._dataAppService.isNewAssetEnum.second;
*/
  public isNewAssetEnum =  this._dataAppService.isNewAssetEnum;
  public typeUserEnum = this._dataAppService.typeUserEnum;
  
  public Assets: any;
  public xlsxComperEnum = XlsxComperEnum;
  constructor(private http: HttpClient, private router: Router, public _dataAppService: DataAppService) { }

  ngOnInit() {
    this.GetAllAssets();
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }


  public removeItem(assetsId:string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/assets/remove', {assetsId: assetsId}, httpOptions)
      .subscribe(res => {
          this.GetAllAssets();
        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );
  }

  private GetAllAssets() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get('/assets', httpOptions).subscribe(data => {
      this.Assets = data;
    }, err => {
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }
}
