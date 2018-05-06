import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {XlsxComperEnum} from "../../../enums/xlsx-comper.enum";
import {DataAppService} from "../../../services/data-app.service";


@Component({
  selector: 'app-assets-edit',
  templateUrl: './assets-edit.component.html',
  styleUrls: ['./assets-edit.component.scss']
})
export class AssetsEditComponent implements OnInit {
  public typeUserEnum = this._dataAppService.typeUserEnum;
  public isNewAssetEnum = this._dataAppService.isNewAssetEnum;

  public assets:any = [];
  public retPage:string = 'assetslist';
  public xlsxComperEnum = XlsxComperEnum;

  public loadingApp:boolean = false;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
              private _dataAppService: DataAppService, public _location: Location) { }

  ngOnInit() {
    this.getAssets(this.route.snapshot.params['id']);
    this.retPage = this.route.snapshot.params['retPage'];
  }

  getAssets(id) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    var idList = [id];
    this.assets = [];
    this.http.get('/assets/' + idList, httpOptions)
      .subscribe(data => {
          if (data['error']){

          } else {
            this.assets = data[0];
          }

        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );



  }

  updateAssets(id, data) {
    this.loadingApp =true;
    //data.typeUser = this.typeUserEnum[data.typeUser];
    //data.isNewAsset = this.isNewAssetEnum[data.isNewAsset];

    this.http.put('/assets/' + id, data)
      .subscribe(res => {
        setTimeout(() => {
          this.loadingApp =false;
          this._location.back();
          /*if (this.retPage == 'userassets'){
            this.router.navigate(['/user-assets', data.owner_id]);
          } else if(this.retPage == 'assetslist'){
            this.router.navigate(['/assets-list']);
          }
*/
        }, 2000);


        }, (err) => {
          console.log(err);
        }
      );
  }
}
