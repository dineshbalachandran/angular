import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from './users-service.service';
import { CounterServiceService } from './counter-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  ngOnInit(): void {  }

  get activeCount() {
    return this.counterService.activeCount;
  }

  get inactiveCount() {
    return this.counterService.inactiveCount;
  }

  constructor(private userService: UsersServiceService, private counterService : CounterServiceService) {}
}
