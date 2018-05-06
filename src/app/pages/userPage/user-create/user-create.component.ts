import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {XlsxComperEnum} from "../../../enums/xlsx-comper.enum";
import {XlsxComperService} from "../../../services/xlsx-comper.service";
import {User} from "../../../classes/user";



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  public loadingApp:boolean = false;

  user = [];
  fileToUpload: File = null;
  public xlsxComperEnum = XlsxComperEnum;

  constructor(private http: HttpClient, private router: Router, private _XlsxComperService: XlsxComperService) { }

  ngOnInit() {
  }



  file:File;
  incomingfile(event)
  {
    this.file= event.target.files[0];
  }

  Upload() {
    this._XlsxComperService.Action(this.file, (data:User[]) =>{
      this.saveAllUser(data);
    });
  }

  /*handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    var t = XLSX.utils.sheet_to_json(this.fileToUpload);
  }*/


  saveUser() {
    this.loadingApp =true;
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.user['isAddAsset'] = true;
    this.http.post('/user', this.user, httpOptions)
      .subscribe(res => {
          //let id = res['_id'];
        setTimeout(() => {
          this.loadingApp =false;
          this.router.navigate(['/users']);
        }, 2000);

        }, (err) => {
          alert(err);
        this.loadingApp =false;
        }
      );
  }

  private saveAllUser(data:User[]) {
    this.loadingApp =true;
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/user/list', data, httpOptions)
      .subscribe(res => {
        setTimeout(() => {
          this.loadingApp =false;
          this.router.navigate(['/users']);
        }, 3000);
          this.loadingApp =false;

        }, (err) => {
          alert(err);
          this.loadingApp =false;

        }
      );
  }
}
