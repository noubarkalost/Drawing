
import {Component, OnInit} from '@angular/core';
import {LocalstorageService} from "../services/localstorage.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  userName: string | null = ''
  constructor(private storage:LocalstorageService) { }
  ngOnInit() : void{
    this.userName = this.storage.get('userName')
  }
  signOut(){
    this.storage.set('loggedInUser','');
    this.storage.set('userName', JSON.stringify(undefined));
    console.log("signed out")
  }


}
