import {Component, OnInit} from '@angular/core';
import {LocalstorageService} from "../services/localstorage.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  imageSRC: string = "assets/Avatars/gentelman.png";
  userName: string | null = ''
  constructor(private storage:LocalstorageService) { }
  ngOnInit() : void{
    this.userName = this.storage.get('userName')
  }
  signOut(){
    this.storage.set('loggedInUser','');
    this.storage.set('userName', JSON.stringify(undefined));

  }
  changeImage(){
    if(this.imageSRC ===  "assets/Avatars/gentelman.png"){
      this.imageSRC = "assets/Avatars/lady.png"
    }
    else{
      this.imageSRC = this.imageSRC = "assets/Avatars/gentelman.png"
    }
  }

  }
