import { Component } from '@angular/core';
import {LocalstorageService} from "../services/localstorage.service";
import {UserinfoService} from "../services/userinfo.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  usersListName = 'usersList';
  email: string = this.userInfo.userEmail;
  constructor(private storage:LocalstorageService ,private userInfo: UserinfoService) { }
  signOut(){
    this.storage.set('loggedInUser', JSON.stringify(undefined));
    this.storage.set('userName', JSON.stringify(undefined));


  }

}


