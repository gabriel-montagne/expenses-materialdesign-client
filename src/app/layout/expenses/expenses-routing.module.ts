import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatModule } from '../../shared';

import { ExpensesComponent } from './component/expenses.component';
import { ExpensesResolver } from './shared/expenses.resolver';
import { UsersResolver } from '../users/shared/users.resolver';
import { UsersService } from '../users/shared/users.services';
import { UsersActions } from '../users/shared/users.actions';
import { ExpensesActions } from './shared/expenses.actions';

const routes: Routes = [
  {
    path: '',
    component: ExpensesComponent,
    resolve: {
      expensesResolver: ExpensesResolver,
      usersResolver: UsersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [ExpensesResolver, UsersResolver, UsersService, UsersActions],
  exports: [RouterModule]
})
export class ExpensesRoutingModule {
}
