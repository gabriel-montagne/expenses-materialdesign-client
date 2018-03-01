import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../../users/shared/user';
import { ExpensesService } from './expenses.service';
import { ExpensesActions } from './expenses.actions';
import { IAppState } from '../../../shared/store/store.module';
import { NgRedux } from '@angular-redux/store';
import { Expense } from './expense';

@Injectable()
export class ExpensesResolver implements Resolve<any> {

  constructor(private _expensesService: ExpensesService,
              private _expensesActions: ExpensesActions,
              private _ngRedux: NgRedux<IAppState>) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserId = localStorage.getItem('userid');
    return this._expensesService.getUserExpenses(currentUserId)
      .subscribe(
        (result: any) => {
          const expenses = result.map((expense) => {
            return new Expense(expense);
          });
          this._expensesActions.saveExpenses(expenses);
          return;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
