import { Component, OnInit } from '@angular/core';
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$ = this.userService.getUsers();
  constructor(private readonly userService:UserService) { }

  ngOnInit(): void {
  }

}
