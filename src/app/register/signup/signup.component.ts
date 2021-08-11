import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  currentForm: number = 0
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
    const password = this.form.controls[this.currentForm]?.get('password')?.value
    const confirmedPassword = this.form.controls[this.currentForm]?.get('confirmPassword')?.value
    return password !== confirmedPassword;
  }

  constructor() {
  }

  ngOnInit(): void {
  }


  onSignUp() {
    console.log(this.form.controls.name.value)
    console.log(this.form.controls.password.value)
    console.log(this.form.controls.email.value)
  }

}
