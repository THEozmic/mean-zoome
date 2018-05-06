import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import {XlsxComperEnum} from "../../../enums/xlsx-comper.enum";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: any;
  public xlsxComperEnum = XlsxComperEnum;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
   this.GetAllUsers();
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }




  allInfoItem(infroUserId){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get('/infroUser/'+ infroUserId, httpOptions).subscribe(data => {
      //this.users = data;
      console.log(this.users);
    }, err => {
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }

  public removeItem(userId:string){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken')  })
    };
    this.http.post('/user/remove', {userId: userId}, httpOptions)
      .subscribe(res => {
          this.GetAllUsers();
        }, (err) => {
          alert(err);
          //console.log(err);
        }
      );
  }

  private GetAllUsers() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get('/user', httpOptions).subscribe(data => {
      this.users = data;
      //console.log(this.users);
    }, err => {
      if(err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }
}
