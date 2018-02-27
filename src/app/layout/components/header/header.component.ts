import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthServices } from '../../../auth/shared/auth.services';
import { PermissionHandlerServices } from '../../../shared/services/permission-handler.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pushRightClass: 'push-right';

  constructor(public router: Router,
              private _authServices: AuthServices) {
  }

  ngOnInit() {
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this._authServices.logout().subscribe(
      res => {
        this.router.navigate(['login']);
      }
    );
  }
}
