import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintRoutingModule } from './paint-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { CirclesComponent } from './circles/circles.component';
import { CircleComponent } from './circle/circle.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    CanvasComponent,
    CirclesComponent,
    CircleComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    PaintRoutingModule
  ]
})
export class PaintModule { }
