import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransferStateService, isScullyGenerated } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import {
  filter,
  map,
  pluck,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { UserService } from '../users/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userId$: Observable<number> = this.route.params.pipe(
    tap(console.error),
    pluck('userId'),
    map((val) => parseInt(val, 10)),
    shareReplay(1)
  );

  user$ = isScullyGenerated()
    ? this.transferState
        .getState('user')
    : this.userId$.pipe(
        switchMap((id) => this.userService.getUser(id)),
        tap((user) => this.transferState.setState('user', user))
      );
  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly transferState: TransferStateService
  ) {}

  ngOnInit(): void {}
}
