import {Component,OnInit} from '@angular/core';
import {ResponseValidation} from 'src/app/model/ResponseValidation';
import {User} from 'src/app/model/User';
import {LoginService} from 'src/app/services/login.service';
import {UserService} from 'src/app/services/User.service';
import { ValidationUserService } from 'src/app/services/ValidationUser.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public Auth = this.HttpLogin.ShareAuth;
  public UserObj: User = {};
  public Type = "password";
  public ShowPassword = false;
  public CheckHaveEmail:boolean;
  public ToAlert:ResponseValidation={};
  public OpenAlert=false;
  public ResponseMessage: Array<ResponseValidation>=
  [{
    "Isok": true,
    "Message": ''
   },
   {
    "Isok": true,
    "Message": ''
   },
   {
    "Isok": true,
    "Message": ''
   },
   {
    "Isok": true,
    "Message": ''
   },
   {
    "Isok": true,
    "Message": ''
  }];


  public options =
  [{
      Role: "מנהל",
      Value: "Admin"
    },
    {
      Role: "משתמש",
      Value: "User"
    }
  ];
  constructor(private HttpLogin: LoginService, private HttpUser: UserService, private Validation:ValidationUserService) {}

  ngOnInit(): void {
  }

  async onClickAddUser()
   {
     await this.CheckEmail();
     this.ResponseMessage[0] = await this.Validation.CheckFirstName(this.UserObj.FirstName);
     this.ResponseMessage[1] = await this.Validation.CheckLastName(this.UserObj.LastName);
     this.ResponseMessage[2] = await this.Validation.CheckEmail(this.UserObj.Email);
     this.ResponseMessage[3] = await this.Validation.CheckRole(this.UserObj.Role);
     this.ResponseMessage[4] = await this.Validation.CheckPassword(this.UserObj.Password);
    if(!this.ResponseMessage[0] || !this.ResponseMessage[1] ||
      !this.ResponseMessage[2] || ! this.ResponseMessage[3] ||
      !this.ResponseMessage[4] || this.CheckHaveEmail)
      {
        return;
      }
      try
      {
        await this.HttpUser.AddUser(this.UserObj,this.Auth);
        this.ToAlert.Isok=false;
        this.ToAlert.Message="המשתמש נוסף בהצלחה"
        this.OpenAlert=true;
        //אלרט הצלחנו
      }
      catch
      {
        //אלרט לא הצלחנו
        this.ToAlert.Isok=true;
        this.ToAlert.Message="לא הצלחנו להוסיף את המשתמש אנא נסה נשית מאוחר יותר!"
        this.OpenAlert=true;
      }

   }

   async CheckEmail()
   {
     this.CheckHaveEmail =  await this.HttpUser.CheckEmail(this.UserObj.Email,this.Auth);
   }

   CloseAlert(close:boolean)
   {
     if(!this.ToAlert.Isok)
     {
       this.UserObj={};
     }
     this.OpenAlert=close
     this.ToAlert={};
   }

}
