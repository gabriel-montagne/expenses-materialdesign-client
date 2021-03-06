import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { NgReduxModule } from '@angular-redux/store';
import { StoreModule } from './shared/store/store.module';
import { AuthenticationService } from './auth/shared/authentication.service';
import { AnonymGuard } from './shared/guard/anonym.guard';
import { PermissionHandlerServices } from './shared/services/permission-handler.services';
import { LoginActions } from './auth/login/shared/login.actions';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { environment, oAuthProviders } from '../environments/environment';
import { ToastModule } from 'ng2-toastr';
import { TokenInterceptor } from './auth/shared/token.interceptor';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  // for development
  // return new TranslateHttpLoader(http, '/start-angular/expenses-materialdesign-client/master/dist/assets/i18n/', '.json');
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgReduxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    StoreModule,
    Angular2SocialLoginModule,
    ToastModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
    AuthGuard,
    AnonymGuard,
    AuthenticationService,
    PermissionHandlerServices,
    LoginActions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

Angular2SocialLoginModule.loadProvidersScripts(oAuthProviders);
