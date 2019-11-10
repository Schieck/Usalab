import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SearchComponent } from './components/search/search.component';
import { IgxCalendarModule } from 'igniteui-angular';
import localeBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeBr, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchComponent,
    CalendarComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    IgxCalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
