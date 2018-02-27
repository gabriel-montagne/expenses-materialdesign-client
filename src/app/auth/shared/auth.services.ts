import { Router } from '@angular/router';
import { Injectable, Inject, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ILogin } from '../login/shared/login';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../shared/store/store.module';

@Injectable()
export class AuthServices implements OnDestroy {
  public url = environment.apiUrl;
  public token = environment.apiToken;

  constructor(private _httpClient: HttpClient,
              private _store: NgRedux<IAppState>) {
  }

  public addAuthorization() {
    this.token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  public isAuthenticated() {
    return this._httpClient.get(this.url + 'auth/isAuthenticated', this.addAuthorization());
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
