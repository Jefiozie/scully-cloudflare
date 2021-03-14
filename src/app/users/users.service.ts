import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
const URI = '/api';
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient
      .get(`${URI}/users`)
      .pipe(map((users: []) => users.slice(0, 10)));
  }
  getUser(userId: number) {
    return this.httpClient.get(`${URI}/users/${userId}`).pipe(
      catchError((e) =>
        of({
          id: userId,
          name: e,
        })
      )
    );
  }
}
