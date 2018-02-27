import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { HttpModule } from '@angular/http';
import { NgReduxModule } from '@angular-redux/store';
import { StoreModule } from './shared/store/store.module';
import { AuthServices } from './auth/shared/auth.services';
import { AnonymGuard } from './shared/guard/anonym.guard';
import { PermissionHandlerServices } from './shared/services/permission-handler.services';

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
        StoreModule
    ],
    declarations: [AppComponent],
    providers: [AuthGuard, AnonymGuard, AuthServices, PermissionHandlerServices],
    bootstrap: [AppComponent]
})
export class AppModule {}
