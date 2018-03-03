import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from 'angular2-social-login';
import { PermissionHandlerServices } from '../../shared/services/permission-handler.services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { AuthServices } from '../shared/auth.services';
import { ToastModule } from 'ng2-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupRoutingModule } from './signup-routing.module';
import { LoginActions } from '../login/shared/login.actions';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
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
        SignupRoutingModule,
        NgReduxModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ToastModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
