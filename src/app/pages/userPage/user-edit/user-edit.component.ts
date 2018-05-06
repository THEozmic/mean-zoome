import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {XlsxComperEnum} from "../../../enums/xlsx-comper.enum";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  public loadingApp:boolean = false;

  public user = {};
  public xlsxComperEnum = XlsxComperEnum;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id) {
    this.http.get('/user/' + id).subscribe(data => {
      this.user = data;
    });
  }

  updateUser(id, data) {
    this.loadingApp =true;

    this.http.put('/user/' +id, data)
      .subscribe(res => {
        setTimeout(() => {
          this.loadingApp =false;
          this.router.navigate(['/users']);
        }, 2000);

          //let id = res['_id'];
          //this.router.navigate(['/book-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }


}
