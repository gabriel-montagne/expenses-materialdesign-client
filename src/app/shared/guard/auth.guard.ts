import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/shared/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { select } from '@angular-redux/store';
import { LoginResponse } from '../../auth/login/shared/login';
import { PermissionHandlerServices } from '../services/permission-handler.services';
import { LoginActions } from '../../auth/login/shared/login.actions';

@Injectable()
export class AuthGuard implements CanActivate {

  private _login: any;
  @select(['login', 'login'])
  private _login$: Observable<any>;

  constructor(private _router: Router,
              private _auth: AuthenticationService,
              private _permissionHandler: PermissionHandlerServices,
              private _loginActions: LoginActions) {
    this._login$.subscribe((login) => {
      this._login = login;
    });
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    this.ifLoginNull();

    this.ifPermissionsEmpty();

    return this.resolveRoute(route, state);
  }

  private ifLoginNull() {
    if (!this._login) {
      const token = localStorage.getItem('token');
      if (token) {
        const login = new LoginResponse(token);
        this._loginActions.saveLogin(login);
      }
    }
  }

  private ifPermissionsEmpty() {
    if (Object.keys(this._permissionHandler.routesPermissions).length === 0) {
      try {
        this._permissionHandler.mapPermissions();
      } catch {
        this._router.navigate(['login']);
        return Observable.of(false);
      }
    }
  }

  private resolveRoute(route: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): Observable<boolean> {
    return this._auth.isAuthenticated()
      .map(
        result => {
          if (result && this.checkScope(state)) {
            return true;
          } else {
            this._router.navigate(['login']);
            return false;
          }
        }
      )
      .catch(
        () => {
          this._router.navigate(['login']);
          return Observable.of(false);
        });
  }

  private checkScope(state): boolean {
    return this._permissionHandler.routesPermissions[state.url];
  }
}
