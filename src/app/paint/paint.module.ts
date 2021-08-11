import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintRoutingModule } from './paint-routing.module';
import { CanvasComponent } from './canvas/canvas.component';
import { CirclesComponent } from './circles/circles.component';
import { CircleComponent } from './circle/circle.component';
import { ProjectComponent } from './project/project.component';
import {FormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { SavedComponent } from './saved/saved.component';


@NgModule({
  declarations: [
    CanvasComponent,
    CirclesComponent,
    CircleComponent,
    ProjectComponent,
    HeaderComponent,
    SavedComponent
  ],
  imports: [
    CommonModule,
    PaintRoutingModule,
    FormsModule
  ],
  exports:[
    CanvasComponent
  ]
})
export class PaintModule { }
