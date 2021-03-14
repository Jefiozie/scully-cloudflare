import { Component, OnInit } from '@angular/core';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { tap } from 'rxjs/operators';
import { UserService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users$ = isScullyGenerated()
    ? this.transferState.getState('users')
    : this.userService
        .getUsers()
        .pipe(tap((user) => this.transferState.setState('users', user)));

  constructor(
    private readonly userService: UserService,
    private readonly transferState: TransferStateService
  ) {}

  ngOnInit(): void {}
}
