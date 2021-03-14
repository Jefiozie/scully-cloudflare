import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const URI = '/api'
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get(`${URI}/users`);
  }
}
