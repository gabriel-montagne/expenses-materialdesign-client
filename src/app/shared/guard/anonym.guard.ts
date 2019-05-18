import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/shared/authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AnonymGuard implements CanActivate {
  constructor(private _router: Router,
              private _auth: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this._auth.isAuthenticated()
      .map (
        result => {
          if (result) {
            this._router.navigate(['']);
            return false;
          } else {
            return true;
          }
        }
      )
      .catch(() => {
        return Observable.of(false);
      });
  }
}
