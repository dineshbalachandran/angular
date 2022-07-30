import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersServiceService } from '../users-service.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  users: string[];

  onSetToActive(id: number) {    
    this.userService.setActive(id);
  }

  ngOnInit(): void {
    this.users = this.userService.inactiveUsers; 
  }

  constructor(private userService: UsersServiceService) {}
}
