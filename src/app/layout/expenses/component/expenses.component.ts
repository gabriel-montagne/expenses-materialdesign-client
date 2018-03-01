import { Component, OnInit } from '@angular/core';
import { IUser, User } from '../../users/shared/user';
import { Expense } from '../shared/expense';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';
import { ExpensesService } from '../shared/expenses.service';
import { IAppState } from '../../../shared/store/store.module';
import * as moment from 'moment';
import { ExpensesActions } from '../shared/expenses.actions';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  public selectedUser: User;
  public isManager = false;
  public isMe = false;

  public currentExpense: Expense;

  public users: User[];

  @select(['users', 'users'])
  private _users$: Observable<any>;

  public expenses: Expense[];

  @select(['expenses', 'expenses'])
  private _expenses$: Observable<any>;

  constructor(
    private _expensesService: ExpensesService,
    private _expensesActions: ExpensesActions,
    private _ngRedux: NgRedux<IAppState>
  ) {
    this.isManager = (localStorage.getItem('role') === 'manager');
    const userId = localStorage.getItem('userid');
    this._users$.subscribe((users) => {
      this.users = users.map((user) => {
        if (user.id.toString() === userId) {
          this.selectedUser = user;
          this.isMe = true;
        }
        return user;
      });
    });
    this._expenses$.subscribe((expenses) => {
      this.expenses = expenses.map((expense: Expense) => {
        expense.isEditable = (this.isManager || userId === expense.userId.toString());
        expense.isEdited = false;
        return expense;
      });
    });
  }

  ngOnInit() {
  }

  public updateDate(event) {
    console.log(this.currentExpense.date);
    this.currentExpense.date = new Date( moment(event).format('YYYY-MM-DD HH:mm'));
  }

  public addExpense(): void {
    if (this.currentExpense) {
      alert('You must save the expense you are currently editing!');
      return;
    }
    this.currentExpense = new Expense({
      userId: this.selectedUser.id,
      isEditable: true,
      isEdited: true
    });
    this.expenses.push(this.currentExpense);
  }

  public editEpense(expense) {
    this.currentExpense = expense;
    this.currentExpense.isEdited = true;
  }

  public cancelEdit(): void {
    this.currentExpense.isEdited = false
    const idx = this.expenses.findIndex((expense) => {
      return expense.id === this.currentExpense.id;
    });
    const expense = this.expenses[idx];
    if (expense.id === 0) {
      this.expenses.splice(idx, 1);
    } else {
      this.expenses.splice(idx, 1, expense);
    }
    this.currentExpense = null;
  }

  public saveExpense(): void {
    if (this.currentExpense.id === 0) {
      this.postExpense();
      return;
    } else {
      this.patchExpense();
      return;
    }
  }

  public postExpense() {
    return this._expensesService.addExpense(this.currentExpense.toSave())
      .subscribe(
        (result: Expense) => {
          this._expensesActions.saveExpense(result);
        },
        error => console.log(error)
      );
  }

  public patchExpense() {
    return this._expensesService.updateExpense(this.currentExpense.toSave())
      .subscribe(
        (result: Expense) => {
          this._expensesActions.saveExpense(result);
        },
        error => console.log(error)
      );
  }

  public deleteExpense(expense) {
    return this._expensesService.deleteExpense(expense.toSave())
      .subscribe(
        (result) => {
          this._expensesActions.deleteExpense(expense);
        },
        error => console.log(error)
      );
  }
}
