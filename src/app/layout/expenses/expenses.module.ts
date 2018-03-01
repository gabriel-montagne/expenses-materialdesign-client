import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { StatModule } from '../../shared/modules';
import { ExpensesComponent } from './component/expenses.component';
import { ExpensesService } from './shared/expenses.service';
import { ExpensesActions } from './shared/expenses.actions';
import { PageHeaderModule } from '../../shared';
import { FormsModule } from '@angular/forms';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

@NgModule({
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    FormsModule,
    PageHeaderModule,
    StatModule,
    NguiDatetimePickerModule
  ],
  providers: [ExpensesService, ExpensesActions],
  declarations: [ExpensesComponent]
})
export class ExpensesModule {
}
