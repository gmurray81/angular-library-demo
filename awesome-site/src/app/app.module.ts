import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { AwesomeImageModule } from 'awesome-library';
import { RoundImageModule } from 'awesome-library';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AwesomeImageModule,
    RoundImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
