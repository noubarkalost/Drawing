import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintRoutingModule } from './paint-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { CirclesComponent } from './circles/circles.component';


@NgModule({
  declarations: [
    CanvasComponent,
    CirclesComponent
  ],
  imports: [
    CommonModule,
    PaintRoutingModule
  ]
})
export class PaintModule { }
