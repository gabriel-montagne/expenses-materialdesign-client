import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PermissionHandlerServices } from '../../../shared/services/permission-handler.services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public menuPermissions: any = {};
  public routesPermissions: any = {};
  isActive = false;
  showMenu = '';
  pushRightClass = 'push-right';

  constructor(public router: Router,
              private _permissionHandler: PermissionHandlerServices) {
    this.menuPermissions = _permissionHandler.menuPermissions;
    this.routesPermissions = _permissionHandler.routesPermissions;
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }
}
