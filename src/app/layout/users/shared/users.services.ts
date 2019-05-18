import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UsersService {
  public url = environment.apiUrl;
  public token = environment.apiToken;
  public httpOptions: any;

  constructor(private _apiHttp: HttpClient) {
  }

  public getUsers() {
    return this._apiHttp.get(this.url + 'users');
  }

  public getMe() {
    return this._apiHttp.get(this.url + 'users/me');
  }

  public getUser(id: number) {
    return this._apiHttp.get(this.url + 'users/' + id.toString());
  }

  public updateUser(user: IUser) {
    return this._apiHttp.post(this.url + 'users/' + user.id.toString(), user);
  }

  public deleteUser(id: number) {
    return this._apiHttp.delete(this.url + 'users/' + id.toString());
  }
}
