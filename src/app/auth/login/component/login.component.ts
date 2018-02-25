import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { AuthServices } from '../../shared/auth.services';
import { ILogin, ILoginResponse, LoginResponse } from '../shared/login';
import { FormControl, FormGroup } from '@angular/forms';
import { error } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public username: string = null;
  public isLoginUnsuccessful: Boolean = false;

  constructor(public _router: Router,
              private _authServices: AuthServices) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  public onBasicLogin(form: FormGroup) {
    this.isLoginUnsuccessful = false;
    const payload = {
      username: form.get('username').value,
      password: form.get('password').value
    };

    this._authServices.basicLogin(payload)
      .subscribe(
        (result: LoginResponse) => {
          const login = new LoginResponse(result.token);
        },
        (err) => {
          this.isLoginUnsuccessful = true;
        }
      );
  }
}
