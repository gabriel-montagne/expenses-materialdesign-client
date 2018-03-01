import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from './expense';

@Injectable()
export class ExpensesService {
  public url = environment.apiUrl;
  public token = environment.apiToken;
  public httpOptions: any;

  constructor(private _apiHttp: HttpClient) {

  }

  public addAuthorization() {
    this.token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  public getUserExpenses(userid: string) {
    return this._apiHttp.get(
      this.url + 'records/' + userid,
      this.addAuthorization());
  }

  public addExpense(expense: Expense) {
    return this._apiHttp.post(
      this.url + 'records/' + expense.userId.toString(),
      expense,
      this.addAuthorization());
  }

  public updateExpense(expense: Expense) {
    return this._apiHttp.patch(
      this.url + 'records/' + expense.userId.toString() + '/' + expense.id.toString(),
      expense,
      this.addAuthorization());
  }

  public deleteExpense(expense: Expense) {
    return this._apiHttp.delete(
      this.url + 'records/' + expense.userId.toString() + '/' + expense.id.toString(),
      this.addAuthorization());
  }
}
