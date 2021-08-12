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
  counter = 1;
  index: number = 0;
  usersList: IUsers[] = [];
  usersListName = 'usersList';
  checkInputs: boolean = false;
  ngOnInit(): void {
    if(this.storage.get('loggedInUser')?.length) {
      this.router.navigate(['/Draw']).then(r=>r)
    }
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  getUserInfo() {
    const userStr = this.storage.get(this.usersListName)
    if(userStr){
      const user = JSON.parse(userStr);
      return user;
    }
  }

  password(){
    // console.log(this.form.controls[0].value)

  }
  onLogIn() {
    const signInUser = this.getUserInfo();
    if(!signInUser){
      this.checkInputs = true;
    }
    signInUser.map((info: { email: string; password: string })=>{
      if(info.email === this.form.controls.email.value && info.password === this.form.controls.password.value && this.form.valid){
        this.userInfo.userEmail = info.email;
        this.router.navigate(['/Draw']).then(r=>r)
        this.storage.set('loggedInUser',info.email);
      } else {
        this.checkInputs = true;
      }
    });

  }


}
