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

    constructor(
        private _apiHttp: HttpClient
    ) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Token': this.token
            })
        };
    }

    public getUsers() {
        return this._apiHttp.get(this.url + 'users', this.httpOptions);
    }

    public getMe() {
        return this._apiHttp.get(this.url + 'users/me', this.httpOptions);
    }

    public getUser(id: number) {
        return this._apiHttp.get(this.url + 'users/' + id.toString(), this.httpOptions);
    }

    public updateUser(user: IUser) {
        return this._apiHttp.post(this.url + 'users/' + user.id.toString(), user, this.httpOptions);
    }

    public deleteUser(id: number) {
        return this._apiHttp.delete(this.url + 'users/' + id.toString(), this.httpOptions);
    }
}
