import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatModule } from '../../shared';

import { UsersComponent } from './component/users.component';
import { UsersResolver } from './shared/users.resolver';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      usersResolver: UsersResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule],
  providers: [UsersResolver],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
