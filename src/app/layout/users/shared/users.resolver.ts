import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from '@angular-redux/store';
import { UsersService } from './users.services';
import { UsersActions } from './users.actions';
import { IAppState } from '../../../shared/store/store.module';
import { User } from './user';

@Injectable()
export class UsersResolver implements Resolve<any> {
    constructor(
        private _usersService: UsersService,
        private _usersActions: UsersActions,
        private _ngRedux: NgRedux<IAppState>
    ) {
    }
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._usersService.getUsers()
            .subscribe(
                (result: any) => {
                    const usersJSON = result;
                    const users = usersJSON.map((element) => {
                        return new User(element);
                    })
                    this._usersActions.saveUsers(users);
                    return;
                },
                (error: any) => {
                    console.error(error);
                }
            );
    }
}
