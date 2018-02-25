import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './component/users.component';
import { StatModule} from '../../shared/modules';
import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './shared/users.services';

@NgModule({
  imports: [
    CommonModule,
      UsersRoutingModule,
      StatModule,
  ],
  providers: [UsersService],
  declarations: [UsersComponent]
})
export class UsersModule { }

