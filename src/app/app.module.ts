import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { BoothViewComponent } from './booth-view/booth-view.component';
import { LiveViewComponent } from './live-view/live-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    BoothViewComponent,
    LiveViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
