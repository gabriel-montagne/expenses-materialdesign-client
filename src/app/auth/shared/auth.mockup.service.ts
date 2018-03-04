import { AbstractMockObservableService } from '../../shared/tests/abstract-mock-observable.spec';
import { Observable } from 'rxjs/Observable';

export class AuthenticationMockupService extends AbstractMockObservableService {

  private logins = [
    {
      username: 'user1',
      password: 'password1',
      result: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJlbWFpbCI6ImdhYmltdW50ZWFudS5zZHRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJnYWJpbXVudGVhbnUuc2R0QGdtYWlsLmNvbSIsInVzZXJpZCI6MTMsImZ1bGxuYW1lIjoiR2FicmllbCBNdW50ZWFudSJ9.w86SWZwL735MrdDQ-PHkHBkGR3XGDe17TVOUfWyeWC0'
      }
    },
    {
      username: 'existing@user.com',
      password: 'password2',
      result: {
        token: 'token2'
      }
    }
  ];

  isUsernameAvailable(username) {
    let _login = this.logins.filter((login) => {
      return login.username === username;
    });
    if (_login.length === 0) {
      this._fakeContent = 'true';
    } else {
      this._fakeContent = 'false';
    }
    return this;
  }

  onSuccessfulLogin(token): void {
    // console.log(token);
  }

  basicLogin(payload) {
    let _login = this.logins.find((login) => {
      return login.username === payload.username;
    });
    if (_login) {
      if (_login.password === payload.password) {
        this._fakeContent = 'Authentication successful';
      } else {
        this._fakeError = 'Authentication unsuccessful';
      }
    } else {
      this._fakeError = 'Authentication unsuccessful';
    }
    return this;
  }
}
