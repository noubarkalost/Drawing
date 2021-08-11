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
  name!:string;
  constructor(private storage:LocalstorageService ,private userInfo: UserinfoService) { }

  getUserInfo() {
    const userStr = this.storage.get(this.usersListName)
    if(userStr){
      const user = JSON.parse(userStr);
      return user;
    }
  }

  getUserName() {
    const currentUser = this.getUserInfo();
    currentUser?.map((info:{ email: string; name: string })=> {
      if(this.email === info.email){
        this.name = info.name
      }
    })
  }

}


