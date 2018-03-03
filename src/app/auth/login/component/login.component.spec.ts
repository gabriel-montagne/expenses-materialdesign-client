import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from '../login-routing.module';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'ng2-toastr';
import { AuthService } from 'angular2-social-login';
import { AuthServices } from '../../shared/auth.services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { PermissionHandlerServices } from '../../../shared/services/permission-handler.services';
import { LoginActions } from '../shared/login.actions';
import { NgReduxModule } from '@angular-redux/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        AuthServices,
        AuthService,
        PermissionHandlerServices,
        LoginActions],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        LoginRoutingModule,
        NgReduxModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
