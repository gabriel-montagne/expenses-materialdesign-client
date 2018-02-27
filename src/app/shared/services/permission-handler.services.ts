import { Injectable } from '@angular/core';
import { getScopes } from '../../../environments/environment';
import { LoginResponse } from '../../auth/login/shared/login';

@Injectable()
export class PermissionHandlerServices {
  private role: string;
  public routesPermissions: any = {};
  public menuPermissions: any = {};

  constructor() {}

  public saveLogin(login) {
    localStorage.setItem('token', login.token);
    localStorage.setItem('role', login.role);
    localStorage.setItem('userid', login.userid);
    this.mapPermissions();
  }

  public mapPermissions(): void {
    const scopes = getScopes();
    this.role = localStorage.getItem('role');
    if (!this.role) {
      const token = localStorage.getItem('token');
      this.role = new LoginResponse(token).role;
      localStorage.setItem('role', this.role);
    }
    this.mapRoutesPermissions(scopes, this.role);
    this.mapMenuPermissions(scopes, this.role);
  }

  public mapRoutesPermissions(scopes: any, role: string): void {
    this.routesPermissions = Object.keys(scopes[role])
      .reduce((r, elem) => {
        r['/' + elem] = scopes[role][elem]['view'];
        return r;
      }, {});
  }

  public  mapMenuPermissions(scopes: any, role: string): void {
    this.menuPermissions = Object.keys(scopes[role])
      .reduce((r, elem) => {
        r[elem] = scopes[role][elem];
        return r;
      }, {});
  }
}
