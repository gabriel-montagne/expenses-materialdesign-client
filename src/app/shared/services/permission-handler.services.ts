import { Injectable } from '@angular/core';
import { LoginResponse } from '../../auth/login/shared/login';
import { appScopes } from './permissions';

@Injectable()
export class PermissionHandlerServices {
  private role: string;
  public routesPermissions: any = {};
  public menuPermissions: any = {};

  constructor() {}

  public mapPermissions(): void {
    this.role = localStorage.getItem('role');
    if (!this.role) {
      const token = localStorage.getItem('token');
      this.role = new LoginResponse(token).role;
      localStorage.setItem('role', this.role);
    }
    this.mapRoutesPermissions(appScopes, this.role);
    this.mapMenuPermissions(appScopes, this.role);
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
