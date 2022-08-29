import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-indicator',
  templateUrl: './image-indicator.component.html',
  styleUrls: ['./image-indicator.component.css']
})
export class ImageIndicatorComponent implements OnInit {
  @Input() value: number;
  isUp: boolean;
  constructor() { }

  ngOnInit(): void {
    this.isUp = this.value > 0;
  }

}
