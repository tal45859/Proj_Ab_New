import { Component, OnInit } from '@angular/core';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { User } from 'src/app/model/User';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/User.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  public UserArr:Array<User> = [];
  public Auth =  this.HttpLogin.ShareAuth;
  public page = 0;
  public ToAlert:ResponseValidation={};
  public OpenAlert=false;
  constructor(private HttpUser:UserService,private HttpLogin:LoginService) { }

  async ngOnInit(): Promise<void> {
    await this.GetAllUsers();
  }

  async GetAllUsers()
  {
    this.UserArr = await this.HttpUser.GetAllUser(this.Auth);
  }

  async OnClickDeleteUser(id:number)
  {
    try
    {
      await this.HttpUser.DeleteUserForAdmin(id,this.Auth);
      await this.GetAllUsers();
      this.ToAlert.Isok=false;
      this.ToAlert.Message="המשתמש נמחק בהצלחה";
      this.OpenAlert=true;
    }
    catch
    {
      this.ToAlert.Isok=true;
      this.ToAlert.Message="לא הצלחנו למחוק את המשתמש אנא נסה שנית מאוחר יותר!";
      this.OpenAlert=true;
    }
  }

  CloseAlert(close:boolean)
  {
    this.OpenAlert=close
    this.ToAlert={};
  }

}
