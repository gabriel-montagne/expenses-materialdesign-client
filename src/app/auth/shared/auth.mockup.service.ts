import { AbstractMockObservableService } from '../../shared/tests/abstract-mock-observable.spec';

export class AuthMockupService extends AbstractMockObservableService {

  private logins = [
    {
      username: 'user1',
      password: 'password1',
      result: {
        token: 'token1'
      }
    },
    {
      username: 'user2',
      password: 'password2',
      result: {
        token: 'token2'
      }
    }
  ];

  isUsernameAvailable(username) {
    return (username === 'existents-user');
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
        this._fakeError = _login.result;
      } else {
        this._fakeContent = 'Authentication successful';
      }
    } else {
      this._fakeError = 'Authentication unsuccessful';
    }
    return this;
  }
}
