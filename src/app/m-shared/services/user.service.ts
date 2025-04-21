import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/m-core/models/object-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user_url = "http://localhost:3000/user/";

  constructor(private http: HttpClient) { }

  getUserData(user_id: number): Observable<User> {
    return this.http.get<User>(`${this.user_url}${user_id}`);
  }

  updateUserData(user_id: number, userData: User): Observable<User> {
    return this.http.put<User>(`${this.user_url}${user_id}`, userData);
  }
}