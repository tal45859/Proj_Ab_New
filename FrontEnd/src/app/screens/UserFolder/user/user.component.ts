import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public Role =  this.HttpLogin.ShareRole;
  public StageNumber=1;
  constructor(private HttpLogin:LoginService) { }

   ngOnInit(){
  }

}
