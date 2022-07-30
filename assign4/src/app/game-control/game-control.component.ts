import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  ref;
  @Output() numberEmitted = new EventEmitter<number>(); 
  i = 0;

  constructor() { }

  ngOnInit() {
  }


  onStart() {
    this.ref = setInterval(()=>{
      this.i++;
      this.numberEmitted.emit(this.i);
    }, 2000)
  }

  onStop() {
    clearInterval(this.ref)
  }

}
