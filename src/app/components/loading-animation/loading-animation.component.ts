import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-animation',
  templateUrl: './loading-animation.component.html',
  styleUrls: ['./loading-inimation.scss']
})
export class LoadingAnimationComponent implements OnInit {

  @Input() isDisplay:boolean = false;
  @Input() isFixedPos:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
