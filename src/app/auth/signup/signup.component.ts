import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../shared/authentication.service';
import { LoginResponse } from '../login/shared/login';
import { ToastsManager } from 'ng2-toastr';

import { registerAsyncValidator } from '../shared/username-exists.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

  public registerForm: FormGroup;

  public isRegistering = false;

  constructor(private _toastr: ToastsManager,
              private _vRef: ViewContainerRef,
              private _auth: AuthenticationService) {
    this._toastr.setRootViewContainerRef(this._vRef);

    this.registerForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('',
        [Validators.email, Validators.required],
        registerAsyncValidator(_auth)),
      password: new FormControl('', Validators.required),
      passwordRepeat: new FormControl('', Validators.required),
    }, this.matchingPasswords('password', 'passwordRepeat'));
  }

  ngOnInit() {
  }

  public register(form: FormGroup) {
    this.isRegistering = true;
    const payload = {
      username: form.get('email').value,
      email: form.get('email').value,
      password: form.get('password').value,
      fullname: form.get('fullname').value
    };
    this._auth.register(payload).subscribe(
      (result: LoginResponse) => {
        this._auth.onSuccessfulLogin(result.token);
        this._toastr.success('Registering was successful!');
        this.isRegistering = false;
      },
      () => {
        this._toastr.warning('Registering was unsuccessful!');
        this.isRegistering = false;
      });
  }

  private validUsername(control: AbstractControl) {
    const username = control.value;
    return this._auth.isUsernameAvailable(username).map(
      (res) => {
        if (res === 'false') {
          return {usernameExists: true};
        } else {
          return null;
        }
      }
    );
  }

  private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (confirmPassword.pristine) {
        return {};
      }
      if (password.value !== confirmPassword.value && password.value !== '' && confirmPassword.value !== '') {
        confirmPassword.setErrors({
          mismatchedPasswords: true
        });
        return {
          mismatchedPasswords: true
        };
      } else {
        return null;
      }
    };
  }
}
