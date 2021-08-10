import { Component, Inject } from '@angular/core';
import { IProject } from '../interfaces/project.interface';
import { ICircle } from '../interfaces/circle.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements IProject {
  id!: string;
  name!: string;
  circles!: ICircle[];

  constructor(@Inject(String) id:string,@Inject(String) name:string,@Inject(String) circles: ICircle[] ) {
    this.id=id;
    this.name=name;
    this.circles = circles
  }

}
