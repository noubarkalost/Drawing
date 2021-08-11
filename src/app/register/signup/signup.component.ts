import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocalstorageService} from "../../paint/services/localstorage.service";
import {IUsers} from "../../paint/interfaces/users.interface";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  counter = 1;
  index: number = 0;
  usersList: IUsers[] = [];
  usersListName = 'usersList'
  constructor(private storage: LocalstorageService) { }
  ngOnInit(): void {
    this.getUsers();
  }
  imageSRC: string = "assets/Avatars/gentelman.png";
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("0[0-9]{8}")]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$")]),
    confirmPassword: new FormControl('', Validators.required),
  })

  password() {
    const password = this.form.controls.password.value
    const confirmedPassword = this.form.controls.confirmPassword.value
    if(password && confirmedPassword){
      return password === confirmedPassword;
    }
    return false
  }
  getUsers(): void {
    const users = this.storage.get(this.usersListName);
    if (users) {
      this.usersList = JSON.parse(users);
    }
  }

  onSignUp() {
     if(this.form.valid) {
      this.usersList.push(this.form.value);
      const usersListStr = JSON.stringify(this.usersList)
      this.storage.set(this.usersListName, usersListStr)
    }
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
