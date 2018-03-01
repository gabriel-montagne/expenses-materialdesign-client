import { ExpensesActions } from '../../layout/expenses/shared/expenses.actions';
import { Expense, IExpense } from '../../layout/expenses/shared/expense';

export interface IExpensesStore {
  expenses: Expense[];
}

export const INITIAL_STATE: IExpensesStore = {
  expenses: []
};

export function expensesReducer(state: IExpensesStore = INITIAL_STATE,
                                action: any): IExpensesStore {
  switch (action.type) {
    case ExpensesActions.SAVE_EXPENSES:
      return {...state, expenses: action.payload};
    case ExpensesActions.SAVE_EXPENSE:
      let expensesToSave = [...state.expenses];
      const savedIdx = expensesToSave.findIndex((expense) => {
        return expense.id === action.payload.expense.id;
      });
      if (savedIdx > -1) {
        expensesToSave.splice(savedIdx, 1, new Expense(action.payload.expense));
      } else {
        expensesToSave.push(new Expense(action.payload.expense));
      }
      return {...state, expenses: expensesToSave};
    case ExpensesActions.DELETE_EXPENSE:
      let expensesToDelete = [...state.expenses];
      const deletedIdx = expensesToDelete.findIndex((expense) => {
        return expense.id === action.payload.expense.id;
      });
      if (deletedIdx > -1) {
        expensesToDelete.splice(deletedIdx, 1);
      }
      return {...state, expenses: expensesToDelete};
    default:
      return state;
  }
}
