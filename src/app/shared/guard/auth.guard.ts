import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServices } from '../../auth/shared/auth.services';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
              private _authServices: AuthServices) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this._authServices.isAuthenticated()
      .map (
        result => {
          if (result) {
            return true;
          } else {
            this._router.navigate(['login']);
            return false;
          }
        }
      )
      .catch((error) => {
        this._router.navigate(['login']);
        return Observable.of(false);
      });
  }
}
