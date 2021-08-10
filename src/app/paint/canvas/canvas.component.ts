import { Component, OnInit } from '@angular/core';
import {ICircle} from "../interfaces/circle.interface";
import {ECircleCount} from "../enums/circle-count.enum";
import {CirclesComponent} from "../circles/circles.component";
import {IProject} from "../interfaces/project.interface";
import {ProjectComponent} from "../project/project.component";
import {LocalstorageService} from "../services/localstorage.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  projectListName = 'circlesProject';
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];
  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#000';
  pointer: string = 'all';
  id!: string;


  constructor(private storage: LocalstorageService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  onSizeSelect(): void {
    this.circles = [];
  }

  onCircleClick(circle: ICircle): void {
    if(this.circles[circle.id].color === this.currentColor ){
      this.circles[circle.id].color = "";
    }else {
      this.circles[circle.id].color = this.currentColor;
    }
  }


  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
  }

  resetColors(): void {
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {
      const c = new CirclesComponent(i,this.newId(),'')
      this.circles.push(c);
    }
  }

  onFillCircles(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.circles.forEach((item) => {
      item.color = this.currentColor;
    })
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }

  onSave(): void {
    if (this.isEmpty(this.circles) || !this.projectName) {
      return;
    }
    const p = new ProjectComponent(this.newId(), this.projectName, this.circles);
    let indexKey;
    for(let i= 0; i< this.projectList.length; i++){
      if(this.projectList[i].id === this.id){
        this.projectList.splice(i,1);
      }
    }
    this.projectList.splice(indexKey||this.projectList.length,0,p)
    this.setStorage();
    this.projectName='';
    this.circles = [];
  }

  setStorage() {
    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }

  getProjects(): void {
    const projects = this.storage.get(this.projectListName);
    if (projects) {
      this.projectList = JSON.parse(projects);
    }
  }

  selectProject(project: IProject): void {
    this.circles = project.circles;
    this.projectName = project.name;
    this.pointer = 'none';
    this.id = project.id
  }

  onDeleteProject(i: number): void {
    this.projectList.splice(i,1)
    this.setStorage();
    if(this.projectList.length === 0){
      this.resetColors();
    }
  }

  onDeleteAll(){
    this.projectList = [];
    this.storage.removeAll()
    this.circles = [];
  }
}
