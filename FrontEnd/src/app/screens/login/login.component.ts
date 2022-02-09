import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { UserService } from './../../services/User.service';
import { User } from 'src/app/model/User';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { LoginService } from 'src/app/services/login.service';
import { ValidationUserService } from 'src/app/services/ValidationUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Tologin:Login={};
  public Auth:string;
  public UserObj:User={};;
  public ipAddress:string;
  public ResponseMessage:Array<ResponseValidation>=[{Isok:true,Message:''},{Isok:true ,Message:''}]
  public Type="password";
  public ShowPassword=false;
  public Message='';

  constructor(private HttpLogin: LoginService ,private router:Router ,private HttpUser:UserService , private Validation:ValidationUserService) { }

  async ngOnInit(){
    this.getIP();
  }

  async OnGetUtha()
  {
    this.Message='';
    this.ResponseMessage[0] = await this.Validation.CheckEmail(this.Tologin.email);
    this.ResponseMessage[1] = await this.Validation.CheckPassword(this.Tologin.password);
    if(!this.ResponseMessage[0].Isok || !this.ResponseMessage[1].Isok)
    {
      return;
    }

    try {
      this.Auth = await this.HttpLogin.GetAuth(this.Tologin);
      this.HttpLogin.ShareAuth = this.Auth;
      this.UserObj = await this.HttpUser.GetUserByJWT(this.Auth);
      this.HttpLogin.ShareRole = this.UserObj.Role;
      sessionStorage.setItem("nav",this.UserObj.Role);
      this.router.navigate(['/User/Details']).then(() => {
        window.location.reload();
      });
    }
     catch
     {
       this.Message="מייל או סיסמה אינם נכונים!";
     }
  }

    getIP()
    {
      this.HttpLogin.getIPAddress().subscribe((res:any)=>{
        this.ipAddress=res.ip;
      });
    }

}
