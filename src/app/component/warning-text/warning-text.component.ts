import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning-text',
  templateUrl: './warning-text.component.html',
  styleUrls: ['./warning-text.component.css']
})
export class WarningTextComponent implements OnInit {
@Input() message: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.message);
    
  }

}
