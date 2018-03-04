import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { AuthServices } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { PermissionHandlerServices } from '../../shared/services/permission-handler.services';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LoginActions } from '../login/shared/login.actions';
import { NgReduxModule } from '@angular-redux/store';
import { StoreModule } from '../../shared/store/store.module';

describe('AuthServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgReduxModule,
        RouterTestingModule,
        StoreModule
      ],
      providers: [
        AuthServices,
        LoginActions,
        PermissionHandlerServices]
    });
  });

  it('should be created',
    inject([AuthServices], (service: AuthServices) => {
      expect(service).toBeTruthy();
    }));

  it('should save login',
    inject([AuthServices],
      fakeAsync((service: AuthServices) => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
          'eyJlbWFpbCI6ImdhYmltdW50ZWFudS5zZHRAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwidXNlcm5hbWUiOiJnYWJpbXVudGVhbnUuc2R0QGdtYWlsLmNvbSIsInVzZXJpZCI6MTMsImZ1bGxuYW1lIjoiR2FicmllbCBNdW50ZWFudSJ9.w86SWZwL735MrdDQ-PHkHBkGR3XGDe17TVOUfWyeWC0';
        service.onSuccessfulLogin(token);
        tick();
        expect(service.login.username).toEqual('gabimunteanu.sdt@gmail.com');
      }) ));
});
