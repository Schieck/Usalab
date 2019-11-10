import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SearchComponent } from './components/search/search.component';
import { IgxCalendarModule } from 'igniteui-angular';
import localeBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeBr, 'pt')
import { AlertComponent  } from './components/alert/alert.component';

import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './helpers';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchComponent,
    CalendarComponent,
    DashboardComponent,
    LoginComponent,
    AlertComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    IgxCalendarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 20000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      progressAnimation: "decreasing"
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
