import { Component, Inject } from '@angular/core';
import { IProject } from '../interfaces/project.interface';
import { ICircle } from '../interfaces/circle.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements IProject {
  id!: string;
  name!: string;
  circles!: ICircle[];

  constructor(@Inject(String) id:string,@Inject(String) name:string,@Inject(String) circles: ICircle[] ) {
    this.id=id;
    this.name=name;
    this.circles = circles
  }

}
