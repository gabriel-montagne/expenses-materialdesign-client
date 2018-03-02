import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthServices } from '../../../auth/shared/auth.services';
import { PermissionHandlerServices } from '../../../shared/services/permission-handler.services';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../shared/store/store.module';
import { Observable } from 'rxjs/Observable';
import { User } from '../../users/shared/user';
import { AuthService } from 'angular2-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedUser = User;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  pushRightClass: 'push-right';

  constructor(public router: Router,
              private _authServices: AuthServices,
              private _oauthService: AuthService,
              private _store: NgRedux<IAppState>) {
    this._login$.subscribe((user) => {
      this.loggedUser = user;
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

  onLoggedout() {
    this._authServices.logout().subscribe(
      res => {
        this._authServices.onLogout();
        this._oauthService.logout();
        this.router.navigate(['login']);
      }
    );
  }
}
