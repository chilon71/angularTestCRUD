import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private apiUsersUrl = 'http://localhost:3000/users';
  public usersInfo = [];

  constructor(private http: HttpClient) {
  }

  getUsersObservable(action = ''): Observable<[]> {
    return this.http.get<[]>(`${this.apiUsersUrl}/${action}/`)
  }

  putUsersObservable(id = '', data): Observable<[]> {
    return this.http.put<[]>(`${this.apiUsersUrl}/${id}`, data);
  }

  postUsersObservable(data): Observable<[]> {
    return this.http.post<[]>(`${this.apiUsersUrl}`, data);
  }

  deleteUsersObservable(id): Observable<[]> {
    return this.http.delete<[]>(`${this.apiUsersUrl}/${id}`);
  }

  public getUsers = () => {
    this.getUsersObservable().subscribe((data: any) => this.usersInfo = data);
  }

  public getUsersById = id => {
    return this.getUsersObservable(id);
  }

  public updateUser = userInfo => {
    return this.putUsersObservable(userInfo.id, userInfo);
  }

  public deleteUser = (id) => {
    return this.deleteUsersObservable(id);
  }

  public addUser = userInfo => {
    return this.postUsersObservable(userInfo);
  }
}
