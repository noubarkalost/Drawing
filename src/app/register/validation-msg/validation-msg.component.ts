import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-validation-msg',
  templateUrl: './validation-msg.component.html',
  styleUrls: ['./validation-msg.component.css']
})
export class ValidationMsgComponent {
  @Input() control!: FormControl
  @Input() inputType!: string;
  @Input() label!: string;
  constructor() { }

  showErrors() {
    const dirty = this.control.dirty;
    const touched = this.control.touched;
    const errors  = this.control.errors;
    return dirty && touched && errors;
  }

}
