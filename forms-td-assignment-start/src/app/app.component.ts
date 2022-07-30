import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f', { static: false }) signupForm: NgForm;

  defaultSubscription = 1;
  subscriptions = ['Basic', 'Advanced', 'Pro'];

  onSubmit() {    
    console.log(this.signupForm.value.email);
    console.log(this.signupForm.value.subscription);
    console.log(this.signupForm.value.password);    
  }

}
