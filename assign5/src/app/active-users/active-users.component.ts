import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UsersServiceService } from '../users-service.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];
  

  onSetToInactive(id: number) {   
    this.userService.setInactive(id);
  }

  ngOnInit(): void {
    this.users = this.userService.activeUsers; 
  }

  constructor(private userService: UsersServiceService) {}

}
