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
            return { ...state, expenses: action.payload};
        case ExpensesActions.SAVE_EXPENSE:
            const expenses = state.expenses;
            const idx = expenses.findIndex((elem) => {
                return elem.id === action.payload.expenses.id;
            });
            if (idx > -1) {
                const item = expenses[idx];
                expenses.splice(idx, 1, action.payload.expenses);
            }
            return { ...state, expenses: expenses};
        default:
            return state;
    }
}
