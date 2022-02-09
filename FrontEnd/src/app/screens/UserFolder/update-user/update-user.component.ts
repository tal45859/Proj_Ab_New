import { User } from 'src/app/model/User';
import { UserService } from './../../../services/User.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { ValidationUserService } from 'src/app/services/ValidationUser.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  public Auth = this.HttpLogin.ShareAuth;
  public UserObj:User={};
  private Password;
  public ShowPassword=false;
  public Type="password";
  public ToAlert:ResponseValidation={};
  public OpenAlert=false;
  public ResponseMessage:Array<ResponseValidation>=[{"Isok":true ,"Message":''},{"Isok":true ,"Message":''},{"Isok":true ,"Message":''}];
  // public name = new FormControl(this.UserObj.FirstName);
  constructor(private HttpLogin:LoginService ,private HttpUser:UserService, private Validation:ValidationUserService) { }

  async ngOnInit(): Promise<void> {
    await this.GetUserDetails();
    this.Password=this.UserObj.Password;
    // this.name = new FormControl(this.UserObj.FirstName);
  }
  async GetUserDetails()
  {
    this.UserObj = await this.HttpUser.GetUserByJWT(this.Auth);
  }

  async UpdateUser()
  {

    this.ResponseMessage[0]=await this.Validation.CheckFirstName(this.UserObj.FirstName);
    this.ResponseMessage[1]=await this.Validation.CheckLastName(this.UserObj.LastName);
    if(this.Password!=this.UserObj.Password)
    {
      this.ResponseMessage[2]=await this.Validation.CheckPassword(this.UserObj.Password);
    }
    if(this.ResponseMessage[0].Isok==false || this.ResponseMessage[1].Isok==false || this.ResponseMessage[2].Isok==false)
    {
      return;
    }
    try
    {
      await this.HttpUser.UpdateUser(this.UserObj,this.Auth);
      this.ToAlert.Isok=false;
      this.ToAlert.Message="המשתמש עודכן בהצלחה";
      this.OpenAlert=true;
      await this.GetUserDetails();
    }
    catch
    {
      this.ToAlert.Isok=true;
      this.ToAlert.Message="לא הצלחנו לעדכן את המשתמש אנא נסה שנית מאוחר יותר!";
      this.OpenAlert=true;
    }

  }

  CloseAlert(close:boolean)
  {
    this.OpenAlert=close
    this.ToAlert={};
  }
}

