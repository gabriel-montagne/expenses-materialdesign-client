import { Router } from '@angular/router';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ILogin } from '../login/shared/login';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthServices implements OnDestroy {
  public url = environment.apiUrl;
  public token = environment.apiToken;
  public httpOptions: any;

  constructor(private _httpClient: HttpClient) {

  }

  public isUsernameAvailable(username: string): Observable<any> {
    const payload = {
      username
    };
    return this._httpClient.post(this.url + 'users/isAvailable', payload);
  }

  public register(payload) {
    return this._httpClient.post(this.url + 'auth/signUp', payload);
  }

  public basicLogin(payload) {
    return this._httpClient.post(this.url + 'auth/signIn', payload);
  }

  ngOnDestroy() {

  }
}
