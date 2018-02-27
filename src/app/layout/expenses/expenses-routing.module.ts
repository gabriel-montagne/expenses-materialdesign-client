import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatModule } from '../../shared';

import { ExpensesComponent } from './component/expenses.component';


const routes: Routes = [
    {
        path: '', component: ExpensesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpensesRoutingModule {
}
