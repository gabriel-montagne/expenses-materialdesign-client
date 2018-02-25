import { ExpensesActions } from '../../layout/expenses/expenses.actions';
import { IExpense } from '../../layout/expenses/expense';

export interface IExpensesStore {
    expenses: IExpense[];
}

export const INITIAL_STATE: IExpensesStore = {
    expenses: []
};

export function ExpensesReducer(state: IExpensesStore = INITIAL_STATE,
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
