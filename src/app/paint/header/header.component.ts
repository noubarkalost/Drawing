import {Component, OnInit} from '@angular/core';
import {LocalstorageService} from "../services/localstorage.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  imageSRC: string | null = ''
  userName: string | null = ''
  constructor(private storage:LocalstorageService) { }
  ngOnInit() : void{
    this.userName = this.storage.get('userName')
    this.imageSRC = this.storage.get('avatar')
    if(this.imageSRC?.includes('lady') && this.imageSRC?.includes(String(this.userName)) ){
      this.imageSRC =  'assets/Avatars/lady.png'
    }
    else{
      this.imageSRC =  'assets/Avatars/gentelman.png'
    }
  }
  signOut(){
    this.storage.set('loggedInUser','');
    this.storage.set('userName', JSON.stringify(undefined));

  }

  }
