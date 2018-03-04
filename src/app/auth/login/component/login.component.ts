import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { AuthenticationService } from '../../shared/authentication.service';
import { LoginResponse } from '../shared/login';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'angular2-social-login';
import { GoogleOauthLogin } from '../shared/oauth-login';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public username: string = null;
  public isLoginUnsuccessful: boolean;
  public isLogging = false;

  private sub: any;

  constructor(public _toastr: ToastsManager,
              private _vRef: ViewContainerRef,
              private _authServices: AuthenticationService,
              private _oauthService: AuthService) {
    this._toastr.setRootViewContainerRef(this._vRef);
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
          this._toastr.success('Login was successful!');
          this.isLoginUnsuccessful = false;
        },
        () => {
          this._toastr.warning('Login was unsuccessful!');
          this.isLogging = false;
          this.isLoginUnsuccessful = true;
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
              this._toastr.success('Google login was successful!');
            },
            () => {
              this._toastr.warning('Google login was unsuccessful!');
              this.isLoginUnsuccessful = true;
              this.isLogging = false;
            });
      }
    );
  }
}
