import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-validation-msg',
  templateUrl: './validation-msg.component.html',
  styleUrls: ['./validation-msg.component.css']
})
export class ValidationMsgComponent implements OnInit {
  @Input() control!: FormControl
  @Input() inputType!: string;
  @Input() label!: string;
  constructor() { }

  ngOnInit(): void {
  }
  showErrors() {
    const dirty = this.control.dirty;
    const touched = this.control.touched;
    const errors  = this.control.errors;
    return dirty && touched && errors;
  }

}
