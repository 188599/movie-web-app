import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

import * as dayjs from 'dayjs';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

import { MoviesComponent } from './components/movies.component';
import { MovieDetailsComponent } from './components/movie-details.component';

dayjs.extend(localizedFormat);

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
