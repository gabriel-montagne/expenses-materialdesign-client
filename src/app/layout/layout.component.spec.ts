import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { PageHeaderModule } from '../shared/modules';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../auth/shared/authentication.service';
import { AuthService } from 'angular2-social-login';
import { PermissionHandlerServices } from '../shared/services/permission-handler.services';
import { LoginActions } from '../auth/login/shared/login.actions';
import { NgReduxModule } from '@angular-redux/store';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          LayoutComponent,
          SidebarComponent,
          HeaderComponent],
        imports: [
          HttpClientModule,
          NgReduxModule,
          PageHeaderModule,
          RouterTestingModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: createTranslateLoader,
              deps: [HttpClient]
            }
          })
        ],
        providers: [
          AuthenticationService,
          AuthService,
          LoginActions,
          PermissionHandlerServices
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
