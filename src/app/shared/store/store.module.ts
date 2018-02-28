import { routerReducer } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import { createLogger } from 'redux-logger';
import { environment } from '../../../environments/environment';
import { provideReduxForms } from '@angular-redux/form';
import { IExpense } from '../../layout/expenses/shared/expense';
import { expensesReducer, IExpensesStore } from './expenses.reducer';
import { IUsersStore, usersReducer } from './users.reducer';
import { ILoginStore, loginReducer } from './login.reducer';

export interface IAppState {
  users?: IUsersStore;
  expenses?: IExpensesStore;
  login?: ILoginStore;
}

export const ROOT_REDUCER = combineReducers<IAppState>({
  users: usersReducer,
  expenses: expensesReducer,
  login: loginReducer,
});

// TODO: localstorage
// export const ENHANCERS =  [
//   persistState('users', { key: '@angular-redux/store/users' })
// ];

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule
  ],
  declarations: []
})

export class StoreModule {
  constructor(public store: NgRedux<IAppState>,
              devTool: DevToolsExtension) {
    store.configureStore(
      ROOT_REDUCER,
      {},
      environment.reduxLog ? [createLogger()] : []
      // TODO: localstorage
      // ,
      // [... ENHANCERS, devTool.isEnabled() ? devTool.enhancer() : (f) => f]
    );
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: StoreModule,
      providers: []
    };
  }
}
