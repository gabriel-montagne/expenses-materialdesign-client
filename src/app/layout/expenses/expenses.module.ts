import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { StatModule } from '../../shared/modules';
import { ExpensesComponent } from './component/expenses.component';

@NgModule({
  imports: [
    CommonModule,
      ExpensesRoutingModule,
      StatModule
  ],
  declarations: [ExpensesComponent]
})
export class ExpensesModule { }
