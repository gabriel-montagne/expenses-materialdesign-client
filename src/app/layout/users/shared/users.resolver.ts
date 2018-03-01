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
  constructor(private _usersService: UsersService,
              private _usersActions: UsersActions,
              private _ngRedux: NgRedux<IAppState>) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserId = localStorage.getItem('userid');
    const currentUserRole = localStorage.getItem('role');
    if (currentUserRole === 'user') {
      return this._usersService.getMe()
        .subscribe(
          (result: User) => {
            const users = [result];
            this._usersActions.saveUsers(users);
            return;
          },
          (error: any) => {
            console.error(error);
          }
        );
    } else {
      return this._usersService.getUsers()
        .subscribe(
          (result: any) => {
            const users = result.map((user) => {
              return new User(user);
            });
            this._usersActions.saveUsers(users);
            return;
          },
          (error: any) => {
            console.error(error);
          }
        );
    }
  }
}
