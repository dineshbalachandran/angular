import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SuccessComponent } from './success/success.component';
import { WarningsComponent } from './warnings/warnings.component';

@NgModule({
  declarations: [
    AppComponent,
    SuccessComponent,
    WarningsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
