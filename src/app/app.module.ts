import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppRouteModule} from './modules/app-route/app-route.module';
import {AppComponent} from './app.component';
import {LoginViewComponent} from './components/login-view/login-view.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LogInService} from './services/log-in.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VentanaPrincipalComponent} from './components/ventana-principal/ventana-principal.component';
import { MockBackendService } from './mock-backend/mock-backend.service';
import {UserService} from './services/user.service';
import { HttpClient } from '@angular/common/http';
import {BaseRequestOptions, HttpModule, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    PageNotFoundComponent,
    VentanaPrincipalComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRouteModule,
    FormsModule,
//        HttpModule,
  ],
  providers: [
    LogInService,
    UserService,
    MockBackendService,
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      deps: [MockBackend, BaseRequestOptions],
      useFactory: (backend: MockBackend, options: BaseRequestOptions) => {return new Http(backend, options);}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
