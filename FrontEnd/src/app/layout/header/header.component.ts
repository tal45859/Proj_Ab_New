import { Component, Input, OnInit } from '@angular/core';
import { Menultem } from 'src/app/model/menultem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() MenuItemData : Array<Menultem>;
  constructor() { }

  ngOnInit(): void {
  }

}
