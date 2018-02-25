import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../../shared/store/store.module';

@Injectable()
export class UsersActions {
    public static readonly SAVE_USERS = 'SAVE_USERS';
    public static readonly SAVE_USER = 'SAVE_USER';

    constructor(
        private _ngRedux: NgRedux<IAppState>
    ) {

    }

    public saveUsers(users: {} ) {
        return this._ngRedux.dispatch({type: UsersActions.SAVE_USERS, payload: users});
    }

    public saveUser(user: {} ) {
        const payload_ = { user };
        return this._ngRedux.dispatch({type: UsersActions.SAVE_USER, payload: payload_});
    }
}
