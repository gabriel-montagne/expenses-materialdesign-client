import { Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../login/shared/login';
import { Observable } from 'rxjs/Observable';
import { PermissionHandlerServices } from '../../shared/services/permission-handler.services';
import { LoginActions } from '../login/shared/login.actions';

@Injectable()
export class AuthenticationService implements OnDestroy {
  public url = environment.apiUrl;
  public token = environment.apiToken;
  public login: LoginResponse;

  constructor(public _router: Router,
              private _httpClient: HttpClient,
              private _permissionsHandler: PermissionHandlerServices,
              private _loginActions: LoginActions
  ) {
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

  public onSuccessfulLogin(token) {
    this.login = new LoginResponse(token);
    this.login.saveToLocalStorage();
    this._loginActions.saveLogin(this.login);
    this._permissionsHandler.mapPermissions();
    this._router.navigate(['']);
  }

  public onLogout() {
    this.login.removeFromLocalStorage();
  }

  public isAuthenticated() {
    return this._httpClient.get(this.url + 'auth/isAuthenticated' );
  }

  public getToken() {
    return localStorage.getItem('token');
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

  public oauthLogin(payload) {
    return this._httpClient.post(this.url + 'oauth/authenticate', payload);
  }

  public logout() {
    return this._httpClient.post(this.url + 'auth/signOut', {} );
  }

  ngOnDestroy() {

  }
}
