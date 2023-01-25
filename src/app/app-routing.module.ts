import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoothViewComponent} from "./booth-view/booth-view.component";

const routes: Routes = [
  {
    path: '',
    component: BoothViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
