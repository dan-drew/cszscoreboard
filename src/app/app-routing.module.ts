import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoothViewComponent} from "./booth/booth-view/booth-view.component";
import {LiveViewComponent} from "./live/live-view/live-view.component";
import {ErrorScreenComponent} from "./error-screen/error-screen.component";

const routes: Routes = [
  {
    path: '',
    component: BoothViewComponent
  },
  {
    path: 'live',
    component: LiveViewComponent
  },
  {
    path: 'error',
    component: ErrorScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
