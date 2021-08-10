import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-circles',
  templateUrl: './circles.component.html',
  styleUrls: ['./circles.component.css']
})
export class CirclesComponent implements OnInit {
  @Input() set color(data: string) {
    this._color = data ? data : '#ffffff';
  }
  _color!: string;


  constructor() { }

  ngOnInit(): void {
  }

}
