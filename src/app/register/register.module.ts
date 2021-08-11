import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ValidationMsgComponent } from './validation-msg/validation-msg.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    ValidationMsgComponent
  ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        ReactiveFormsModule
    ],
  exports:[
    SignupComponent
  ]
})
export class RegisterModule { }
