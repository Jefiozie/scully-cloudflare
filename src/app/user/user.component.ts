import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, pluck, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userId$: Observable<number> = this.route.params.pipe(
    tap(console.error),
    pluck('userId'),
    filter((val) => ![undefined, null].includes(val)),
    map((val) => parseInt(val, 10)),
    shareReplay(1)
  );
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {}
}
