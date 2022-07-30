import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  serverId = 20;
  allowNewSuccess =  false;
  addSuccessMessage = 'No add success';
  successName = '';
  twoWay = '';

  constructor() {
    setTimeout(() => {this.allowNewSuccess = true;}, 5000)
   }

  ngOnInit() {
  }

  onAddSuccess() {
    this.addSuccessMessage = 'Add success clicked';
  }

  onUpdateSuccess(event: any) {
    console.log(event);
    this.successName = (<HTMLInputElement>event.target).value;

  }

}
