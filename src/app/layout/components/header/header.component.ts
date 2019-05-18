import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../auth/shared/authentication.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../users/shared/user';
import { AuthService } from 'angular2-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loggedUser: User;

  @select(['login', 'login'])
  private _login$: Observable<any>;

  pushRightClass: 'push-right';

  constructor(public router: Router,
              private _auth: AuthenticationService,
              private _oauthService: AuthService) {
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
    this._auth.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userid');
        this._oauthService.logout();
        this.router.navigate(['login']);
      }
    );
  }
}
