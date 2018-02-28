import { Component, OnInit } from '@angular/core';
import { IUser, ROLES } from '../shared/user';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../../shared/store/store.module';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: IUser[];
  public roles = ROLES;
  public isAdmin = false;

  @select(['users', 'users'])
  private _users$: Observable<any>;

  constructor(private _ngRedux: NgRedux<IAppState>) {
    this.isAdmin = (localStorage.getItem('role') === 'admin');
    this._users$.subscribe((users) => {
      const userId = localStorage.getItem('userid');
      this.users = users.map((user) => {
        user.isRoleEditable = (this.isAdmin && userId !== user.id);
        return user;
      });
    });
  }

  ngOnInit() {
  }

}
