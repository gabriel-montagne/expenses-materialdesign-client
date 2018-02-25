import { routerReducer } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import { createLogger } from 'redux-logger';
import { getConfig } from '../../../environments/environment';
import { provideReduxForms } from '@angular-redux/form';
import { IExpense } from '../../layout/expenses/expense';
import { ExpensesReducer, IExpensesStore } from './expenses.reducer';
import { IUsersStore, UsersReducer } from './users.reducer';

export interface IAppState {
    expenses?: IExpensesStore;
    users?: IUsersStore;
}

export const ROOT_REDUCER = combineReducers<IAppState> ({
    expenses: ExpensesReducer,
    users: UsersReducer
});

@NgModule({
    imports: [
        CommonModule,
        NgReduxModule
    ],
    declarations: []
})

export class StoreModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: StoreModule,
            providers: [
            ]
        };
    }
    constructor(
        public store: NgRedux<IAppState>,
        public devTool: DevToolsExtension,
    ) {
        store.configureStore(
            ROOT_REDUCER,
            {},
            getConfig().reduxLog ? [createLogger()] : []
            // ,
            // [... ENHANCERS, devTool.isEnabled() ? devTool.enhancer() : (f) => f]
        );
    }
}
