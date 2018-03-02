import { Inject, Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from './user';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UsersService {
  public url = environment.apiUrl;
  public token = environment.apiToken;
  public httpOptions: any;

  constructor(private _apiHttp: HttpClient) {}

  public addAuthorization() {
    this.token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  public getUsers() {
    return this._apiHttp.get(this.url + 'users', this.addAuthorization());
  }

  public getMe() {
    return this._apiHttp.get(this.url + 'users/me', this.addAuthorization());
  }

  public getUser(id: number) {
    return this._apiHttp.get(this.url + 'users/' + id.toString(), this.addAuthorization());
  }

  public updateUser(user: IUser) {
    return this._apiHttp.post(this.url + 'users/' + user.id.toString(), user, this.addAuthorization());
  }

  public deleteUser(id: number) {
    return this._apiHttp.delete(this.url + 'users/' + id.toString(), this.addAuthorization());
  }
}
