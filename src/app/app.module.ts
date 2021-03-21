import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HouseComponent } from './house/house.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    HouseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
