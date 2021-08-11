import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanvasComponent} from "./canvas/canvas.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaintRoutingModule { }
