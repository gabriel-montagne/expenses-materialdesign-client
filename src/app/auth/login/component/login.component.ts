import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AuthServices } from '../../shared/auth.services';
import { ILogin, ILoginResponse, LoginResponse } from '../shared/login';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'angular2-social-login';
import { GoogleOauthLogin } from '../shared/oauth-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public username: string = null;
  public isLoginUnsuccessful = false;
  public isLogging = false;

  private sub: any;

  constructor(private _authServices: AuthServices,
              private _oauthService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  public onBasicLogin(form: FormGroup) {
    this.isLoginUnsuccessful = false;
    this.isLogging = true;
    const payload = {
      username: form.get('username').value,
      password: form.get('password').value
    };

    this._authServices.basicLogin(payload)
      .subscribe(
        (result: LoginResponse) => {
          this.isLogging = false;
          this._authServices.onSuccessfulLogin(result.token);
        },
        (err) => {
          this.isLoginUnsuccessful = true;
          this.isLogging = false;
        }
      );
  }

  public onOAuthLogin() {
    this.isLoginUnsuccessful = false;
    this.isLogging = true;
    this.sub = this._oauthService.login('google').subscribe(
      (data) => {
        return this._authServices.oauthLogin(new GoogleOauthLogin(data))
          .subscribe(
            (result: LoginResponse) => {
              this.isLogging = false;
              this._authServices.onSuccessfulLogin(result.token);
            },
            err => {
              this.isLoginUnsuccessful = true;
              this.isLogging = false;
            });
      }
    );
  }
}
