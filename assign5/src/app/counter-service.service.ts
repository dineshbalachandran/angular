import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  activeCount = 0;
  inactiveCount = 0;

  constructor() { }

  addActive() {
    this.activeCount++;
  }

  addInactive() {
    this.inactiveCount++;
  }
}
