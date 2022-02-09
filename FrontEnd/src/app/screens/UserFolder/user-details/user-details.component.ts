import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/model/User';
import { UserService } from './../../../services/User.service';
import { Component, OnInit } from '@angular/core';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public UserDetails:User={};
  public Auth =  this.HttpLogin.ShareAuth;
  public ToAlert:ResponseValidation={};
  public OpenAlert=false;
  constructor(private HttpUser:UserService,private HttpLogin:LoginService,private router:Router) { }

  async ngOnInit(): Promise<void> {
    await this.GetUserDetails();
  }

  async GetUserDetails()
  {
    this.UserDetails = await this.HttpUser.GetUserByJWT(this.Auth);
  }

  async onClickDelete()
  {
    try
    {
      await this.HttpUser.DeleteUser(this.Auth);
      this.ToAlert.Isok=false;
      this.ToAlert.Message="המשתמש נמחק בהצלחה";
      this.OpenAlert=true;
      //לעשות לו ניווט
      //ולזרוק לו אלרט לפני שהוא נמחק בהצלחה
    }
    catch
    {
      //להרים אלרט שהוא לא נמחק בהצלחה
      this.ToAlert.Isok=true;
      this.ToAlert.Message="לא הצלחנו למחוק את המשתמש אנא נסה שנית מאוחר יותר!";
      this.OpenAlert=true;
    }
  }

  CloseAlert(close:boolean)
  {
    if(!this.ToAlert.Isok)
    {
      sessionStorage.clear();
      this.router.navigate(['/Home']).then(() => {
        window.location.reload();
      });
    }
    this.OpenAlert=close
    this.ToAlert={};
  }

}
