import { Component, OnInit } from '@angular/core';
import {ICircle} from "../interfaces/circle.interface";
import {ECircleCount} from "../enums/circle-count.enum";
import {CirclesComponent} from "../circles/circles.component";
import {IProject} from "../interfaces/project.interface";
import {ProjectComponent} from "../project/project.component";
import {LocalstorageService} from "../services/localstorage.service";
import {IUsers} from "../interfaces/users.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  currentUser!: string;
  saveIsDisabled: boolean = false
  fillIsDisabled: boolean = true
  resetIsDisabled: boolean = true
  userName: string | null = ''
  circles: ICircle[] = [];
  projectName: string = '';
  projectList: IProject[] = [];
  projectListName = 'circlesProject';
  usersList: IUsers[] = [];
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];
  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#000';
  pointer: string = 'all';
  id!: string;
  clickAudio: any = new Audio('./assets/sounds/click.wav')
  generateAudio: any = new Audio('./assets/sounds/generate.wav')
  saveAudio: any = new Audio('./assets/sounds/save.wav')
  resetAudio: any = new Audio('./assets/sounds/reset.wav')
  fillAudio: any = new Audio('./assets/sounds/fill.wav')
  userAvatar!: string | null;
  avatarList = []
  buttonText: string = "Save"
  editDisable: boolean = false;
  showButton: string = 'none';

  constructor(private storage: LocalstorageService,  private router:Router) { }

  ngOnInit(): void {
    if(this.storage.get('loggedInUser')?.length) {
      this.router.navigate(['/Draw']).then(r=>r)
    }

    this.getProjects();
    this.storage.get("usersList")
    const getAvatarList = this.storage.get('avatar')
    const users = this.storage.get('userName')
    this.userName = users
    this.avatarList = JSON.parse(<string>getAvatarList)
   this.avatarList.map(item => {
     if(item['name'] === this.userName ){
       if(item["avatar"] === 'lady'){
  this.userAvatar = 'assets/Avatars/lady.png'
       }
       else{
         this.userAvatar = 'assets/Avatars/gentelman.png'
       }
     }

   } )

  }

  onSizeSelect(): void {
    this.circles = [];
  }

  onCircleClick(circle: ICircle): void {
    this.clickAudio.play()
    this.resetIsDisabled = false
    this.fillIsDisabled = false
    if(this.circles[circle.id].color === this.currentColor ){
      this.circles[circle.id].color = "";
    }else {
      this.circles[circle.id].color = this.currentColor;
    }
  }

onEdit(){
    this.editDisable=true;
  this.pointer='all';
}
  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
    this.resetIsDisabled = true
    this.fillIsDisabled = false
    this.resetAudio.play()
  }

  resetColors(): void {
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {
      const c = new CirclesComponent(i,this.newId(),'')
      this.circles.push(c);
    }

  }

  onFillCircles(): void {
    this.fillAudio.play()
    this.resetIsDisabled = false
    this.fillIsDisabled = true
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
  onGenerate(): void {
    this.generateAudio.play()
    this.resetColors();
    this.projectName = '';
    this.fillIsDisabled = false
    this.resetIsDisabled = true
  }
  onSave(): void {
    this.saveAudio.play()
    this.fillIsDisabled = false
    if (this.isEmpty(this.circles) || !this.projectName) {
      return;
    }
    const project = new ProjectComponent(this.currentUser,this.newId(), this.projectName, this.circles);
    let indexKey;
    for(let i= 0; i< this.projectList.length; i++){
      if(this.projectList[i].id === this.id){
        this.projectList.splice(i,1);
      }
    }
    this.projectList.splice(indexKey||this.projectList.length,0,project)
    this.setStorage();
    this.projectName='';
    this.circles = [];
  }

  setStorage() {
    const projectsStr = JSON.stringify(this.projectList);
    this.storage.set(this.projectListName, projectsStr);
  }

  getProjects(): void {
    const currentUserStr = this.storage.get('loggedInUser');
    const projects = this.storage.get(this.projectListName);
    if(currentUserStr){
      this.currentUser = currentUserStr
    } else {
      this.router.navigate(['/']).then(r=>r)
    }
    if (projects) {
      this.projectList = JSON.parse(projects)
    }
  }


  selectProject(project: IProject): void {
    this.circles = project.circles;
    this.projectName = project.name;
    this.pointer = 'none';
    this.id = project.id
    if(project.circles.length === 100){
      this.selectedSize = this.canvasSizes[0];
    }
    else if(project.circles.length === 225){
      this.selectedSize = this.canvasSizes[1];
    }
    else{
      this.selectedSize = this.canvasSizes[2];
    }
    this.showButton = 'block';
    this.editDisable= false;
    this.pointer = 'none';

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

  signOut(){
    this.storage.set('loggedInUser','');
    this.storage.set('userName', JSON.stringify(undefined));
  }




}
