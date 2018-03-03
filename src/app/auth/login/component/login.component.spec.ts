import { async, ComponentFixture, fakeAsync, flushMicrotasks, inject, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from '../login-routing.module';
import { CommonModule } from '@angular/common';
import { ToastModule, ToastsManager } from 'ng2-toastr';
import { AuthService } from 'angular2-social-login';
import { AuthServices } from '../../shared/auth.services';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { PermissionHandlerServices } from '../../../shared/services/permission-handler.services';
import { LoginActions } from '../shared/login.actions';
import { NgReduxModule } from '@angular-redux/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthMockupService } from '../../shared/auth.mockup.service';
import { isMethodMetadata } from '@angular/compiler-cli';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthServices;
  let mockToastsManager;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: AuthServices, useValue: mockAuthServices},
        ToastsManager,
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
    mockAuthServices = new AuthMockupService();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',
    () => {
      expect(component).toBeTruthy();
    });

  it('should create login form', () => {
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#LoginForm')).toBeTruthy();
  });

  it('should successfuly login user1',
    fakeAsync(() => {
      let compiled = fixture.debugElement.nativeElement;
      let app = fixture.debugElement.componentInstance;
      component.loginForm.controls['username'].setValue('user1');
      component.loginForm.controls['password'].setValue('password1');
      fixture.detectChanges();
      compiled.querySelector('#btnLogin').click();
      tick(10000);
      flushMicrotasks();
      expect(component.isLoginUnsuccessful).toEqual(true);
    }));

  it('should unsuccessfuly login user1',
    fakeAsync(() => {
      let compiled = fixture.debugElement.nativeElement;
      let app = fixture.debugElement.componentInstance;
      component.loginForm.controls['username'].setValue('user1');
      component.loginForm.controls['password'].setValue('password incorrect');
      fixture.detectChanges();
      compiled.querySelector('#btnLogin').click();
      tick(10000);
      flushMicrotasks();
      expect(component.isLoginUnsuccessful).toEqual(false);
    }));
});
