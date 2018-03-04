import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from 'angular2-social-login';
import { PermissionHandlerServices } from '../../shared/services/permission-handler.services';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../shared/authentication.service';
import { ToastModule } from 'ng2-toastr';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SignupRoutingModule } from './signup-routing.module';
import { LoginActions } from '../login/shared/login.actions';
import { AuthenticationMockupService } from '../shared/auth.mockup.service';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockAuthenticationServices;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      providers: [
        {provide: AuthenticationService, useValue: mockAuthenticationServices},
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
    mockAuthenticationServices = new AuthenticationMockupService();
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create registration form',
    () => {
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#registerForm')).toBeTruthy();
    });

  it('should raise error on incorrect email',
    () => {
      let form = component.registerForm;
      let control = form.controls['email'];
      control.setValue('some.email');
      let errors = control.errors;
      fixture.detectChanges();
      expect(control.hasError('email')).toBeTruthy();
    });
});
