import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './component/users.component';
import { StatModule} from '../../shared/modules';
import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './shared/users.services';
import { UsersResolver } from './shared/users.resolver';
import { UsersActions } from './shared/users.actions';
import { PageHeaderModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
      UsersRoutingModule,
      PageHeaderModule,
      StatModule
  ],
  providers: [
      UsersService,
      UsersActions
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
