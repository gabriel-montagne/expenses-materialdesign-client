import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth/shared/auth.services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store/store.module';
import { IUser } from '../../layout/users/shared/user';
import { ILoginResponse } from '../../auth/login/shared/login';
import { PermissionHandlerServices } from '../services/permission-handler.services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router,
              private _authServices: AuthServices,
              private _permissionHandler: PermissionHandlerServices) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    if (Object.keys(this._permissionHandler.routesPermissions).length === 0) {
      this._permissionHandler.mapPermissions();
    }

    return this._authServices.isAuthenticated()
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
        error => {
          this._router.navigate(['login']);
          return Observable.of(false);
        });
  }

  private checkScope(state): boolean {
    return this._permissionHandler.routesPermissions[state.url];
  }
}
