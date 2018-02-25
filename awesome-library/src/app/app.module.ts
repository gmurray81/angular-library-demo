import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { RoundImageModule } from '../components/round-image.component';
import { AwesomeImageModule } from '../components/awesome-image.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoundImageModule,
    AwesomeImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
