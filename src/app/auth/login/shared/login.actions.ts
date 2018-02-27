import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../shared/store/store.module';
import { ILoginResponse } from './login';

@Injectable()
export class LoginActions {
  public static readonly SAVE_LOGIN = 'SAVE_LOGIN';
  public static readonly DELETE_LOGIN = 'DELETE_LOGIN';

  constructor(
    private _ngRedux: NgRedux<IAppState>
  ) {}

  public saveLogin(login: any) {
    return this._ngRedux.dispatch({type: LoginActions.SAVE_LOGIN, payload: login});
  }

  public deleteLogin() {
    return this._ngRedux.dispatch({type: LoginActions.DELETE_LOGIN});
  }
}
