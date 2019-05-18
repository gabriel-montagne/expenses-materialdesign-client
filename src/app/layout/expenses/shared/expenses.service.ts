import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Expense } from './expense';

@Injectable()
export class ExpensesService {
  public url = environment.apiUrl;
  public token = environment.apiToken;
  public httpOptions: any;

  constructor(private _apiHttp: HttpClient) {

  }

  public getUserExpenses(userid: string) {
    return this._apiHttp.get(
      this.url + 'records/' + userid);
  }

  public addExpense(expense: Expense) {
    return this._apiHttp.post(
      this.url + 'records/' + expense.userId.toString(),
      expense);
  }

  public updateExpense(expense: Expense) {
    return this._apiHttp.patch(
      this.url + 'records/' + expense.userId.toString() + '/' + expense.id.toString(),
      expense);
  }

  public deleteExpense(expense: Expense) {
    return this._apiHttp.delete(
      this.url + 'records/' + expense.userId.toString() + '/' + expense.id.toString());
  }
}
