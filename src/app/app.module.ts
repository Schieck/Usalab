import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeBr, 'pt');
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';

import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SearchComponent } from './components/search/search.component';
import { IgxCalendarModule } from 'igniteui-angular';
import { AlertComponent  } from './components/alert/alert.component';
import { EssayComponent } from './components/essay/essay.component';
import { EssayDialogComponent } from './components/essay-dialog/essay-dialog.component';

import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './helpers';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { ResearchComponent } from './research/research.component';
import { UsabilityComponent } from './usability/usability.component';
import { EducationComponent } from './education/education.component';
import { ExcelImportComponent } from './components/excel-import/excel-import.component';
import { VisitorsComponent } from './components/visitors/visitors.component';

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
    RegisterComponent,
    UsersComponent,
    ResearchComponent,
    UsabilityComponent,
    EducationComponent,
    EssayComponent,
    EssayDialogComponent,
    ExcelImportComponent,
    VisitorsComponent
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
    MaterialFileInputModule,
    NgxMaterialTimepickerModule,
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
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    fakeBackendProvider
  ],
  entryComponents: [
    EssayComponent,
    EssayDialogComponent,
    ExcelImportComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
