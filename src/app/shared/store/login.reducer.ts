import { ILoginResponse, LoginResponse } from '../../auth/login/shared/login';
import { LoginActions } from '../../auth/login/shared/login.actions';
import { any } from 'codelyzer/util/function';

export interface ILoginStore {
  login?: ILoginResponse;
}

export const INITIAL_STATE: ILoginStore = {
  login: null
};

export function loginReducer(state: ILoginStore = INITIAL_STATE,
                             action: any): ILoginStore {
  switch (action.type) {
    case LoginActions.SAVE_LOGIN:
      return {...state, login: action.payload};
    case LoginActions.DELETE_LOGIN:
      return {...state, login: INITIAL_STATE.login};
    default:
      return state;
  }
}
