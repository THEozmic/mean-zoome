import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public loadingApp:boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    //loading
  }

  goToNex(){
    this.loadingApp =true;
    setTimeout(() => {
      this.loadingApp =false;
      this.router.navigate(['/assets-list']);
    }, 2000);

  }
}
