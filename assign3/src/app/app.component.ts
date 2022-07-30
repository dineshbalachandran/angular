import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display = true;
  n = 0;
  clicks:number[] = [];

  onDisplayDetails() {
    this.display = !this.display;
    this.clicks.push(this.n++);
  }

  getColor() {
    return this.n > 4 ? 'red' : 'black';
  }
}
