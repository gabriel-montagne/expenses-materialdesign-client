import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { StatModule} from '../../shared/modules';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
      UsersRoutingModule,
      StatModule,
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }

