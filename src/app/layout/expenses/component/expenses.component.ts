import { Component, OnInit } from '@angular/core';
import { User } from '../../users/shared/user';
import { Expense } from '../shared/expense';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { ExpensesService } from '../shared/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  public selectedUser: User;

  public expenses: Expense[];

  @select(['expenses', 'expenses'])
  private _expenses$: Observable<any>;

  constructor(
    private _expensesService: ExpensesService
  ) { }

  ngOnInit() {
  }

}
