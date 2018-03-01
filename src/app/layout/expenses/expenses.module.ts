import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { StatModule } from '../../shared/modules';
import { ExpensesComponent } from './component/expenses.component';
import { ExpensesService } from './shared/expenses.service';
import { ExpensesActions } from './shared/expenses.actions';

@NgModule({
  imports: [
    CommonModule,
      ExpensesRoutingModule,
      StatModule
  ],
  providers: [ExpensesService, ExpensesActions],
  declarations: [ExpensesComponent]
})
export class ExpensesModule { }
