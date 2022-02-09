import { Component } from '@angular/core';
import { Admin, items, User } from './data/menu-items';
import { Menultem } from './model/menultem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'abprojnew';
  Nav=sessionStorage.getItem("nav");
  DefultNav : Array<Menultem>=items;
  UserNav : Array<Menultem>=User;
  AdminNav : Array<Menultem>=Admin;
}
