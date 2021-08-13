import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUsers} from "../../paint/interfaces/users.interface";
import {LocalstorageService} from "../../paint/services/localstorage.service";
import {Router} from "@angular/router";
import {UserinfoService} from "../../paint/services/userinfo.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private storage: LocalstorageService, private router: Router, public userInfo: UserinfoService) { }
  usersList: IUsers[] = [];
  usersListName = 'usersList';
  checkInputs: boolean = false;
  ngOnInit(): void {
    if(this.storage.get('loggedInUser')?.length) {
      this.router.navigate(['/Draw'])
    }
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  getUserInfo() {
    const userStr = this.storage.get(this.usersListName)
    if(userStr?.length){
      return JSON.parse(userStr);
    }
  }

  onLogIn() {
    const signInUser = this.getUserInfo();
    if(!signInUser){
      this.checkInputs = true;
    }
    signInUser.forEach(({email,name,password}: { email: string; password: string , name:string })=>{
      if(email === this.form.controls.email.value && password === this.form.controls.password.value && this.form.valid){
        this.userInfo.userEmail = email;
        this.router.navigate(['/Draw']).then(r=>r)
        this.storage.set('loggedInUser',email);
        this.storage.set('userName',name);

      } else {
        this.checkInputs = true;
      }
    });

  }


}
