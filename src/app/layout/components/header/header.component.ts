import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthServices } from '../../../auth/shared/auth.services';
import { PermissionHandlerServices } from '../../../shared/services/permission-handler.services';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../shared/store/store.module';
import { Observable } from 'rxjs/Observable';
import { User } from '../../users/shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public login = User;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  pushRightClass: 'push-right';

  constructor(public router: Router,
              private _authServices: AuthServices,
              private _store: NgRedux<IAppState>) {
    this._login$.subscribe((login) => {
      this.login = login;
    });
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
