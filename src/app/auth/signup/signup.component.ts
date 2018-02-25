import { Component, OnChanges, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { AbstractControl, EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthServices } from '../shared/auth.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private _authServices: AuthServices) {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('',
        Validators.email,
        (control) => {
          return this.validUsername(control);
        }),
      password: new FormControl('', Validators.required),
      passwordRepeat: new FormControl()
    }, this.matchingPasswords('password', 'passwordRepeat'));
  }

  ngOnInit() {
  }

  public register(form: FormGroup) {
    const payload = {
      username: form.get('email').value,
      password: form.get('password').value
    };
    this._authServices.register(payload).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

  private validUsername(control: AbstractControl) {
    console.log(control.errors);
    const username = control.value;
    return this._authServices.isUsernameAvailable(username).map(
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
          mismatchedPasswords: true,
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
