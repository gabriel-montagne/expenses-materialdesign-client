import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../../../shared/store/store.module';
import { IExpense } from './expense';

@Injectable()
export class ExpensesActions {
    public static readonly SAVE_EXPENSES = 'SAVE_EXPENSES';
    public static readonly SAVE_EXPENSE = 'SAVE_EXPENSE';

    constructor(
        private _ngRedux: NgRedux<IAppState>
    ) {}

    public saveExpenses(expenses: IExpense[] ) {
        return this._ngRedux.dispatch({type: ExpensesActions.SAVE_EXPENSES, payload: expenses});
    }

    public saveExpense(expense: IExpense ) {
        const payload_ = { expense };
        return this._ngRedux.dispatch({type: ExpensesActions.SAVE_EXPENSE, payload: payload_});
    }
}
