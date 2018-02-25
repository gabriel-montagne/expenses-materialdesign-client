import { Component, OnInit } from '@angular/core';
import { IUser } from '../shared/user';
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

    @select(['users', 'users'])
    private _users$: Observable<any>;

  constructor(
      private _ngRedux: NgRedux<IAppState>
  ) {
      this._users$.subscribe((users) => {
          this.users = users;
      });
  }

  ngOnInit() {
  }

}
