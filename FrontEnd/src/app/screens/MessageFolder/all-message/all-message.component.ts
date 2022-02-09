import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/Message';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/Message.service';

@Component({
  selector: 'app-all-message',
  templateUrl: './all-message.component.html',
  styleUrls: ['./all-message.component.css']
})
export class AllMessageComponent implements OnInit {
  public ToAlert:ResponseValidation={};
  public OpenAlert=false;
  public MessageArr:Array<Message>=[];
  public Auth= this.HttpLogin.ShareAuth;
  public page = 0;
  constructor(private HttpMessage:MessageService , private HttpLogin:LoginService) { }

  async ngOnInit(): Promise<void> {
    await this.GetAllMessage();
  }

  async GetAllMessage()
  {
    this.MessageArr = await this.HttpMessage.GetAllMessage(this.Auth);
  }

  async OnClickDelete(id:number)
  {
    try
    {
      await this.HttpMessage.DeleteMessage(id,this.Auth);
      await this.GetAllMessage();
      //אלרט הצלחנו למחוק בהצלחה
      this.ToAlert.Isok=false;
      this.ToAlert.Message="ההודעה נמחקה בהצלחה";
      this.OpenAlert=true;
     // alert("ההודעה נמחקה בהצלחה");
    }
    catch
    {
      //אלרט לא הצלחנו למחוק
      this.ToAlert.Isok=true;
      this.ToAlert.Message="לא הצלחנו למחוק אנא נסה מאוחר יותר שנית!";
      this.OpenAlert=true;
      // alert("לא הצלחנו למחוק אנא נסה מאוחר יותר שנית!");
    }
  }

  public ChangePanel(id:number)
  {
    let ClassPanel= document.getElementById(""+id).classList;
    if(ClassPanel.toString() == "panelClose")//אם הוא שווה לו תפתח
    {
      document.getElementById(""+id).classList.remove('panelClose');
      document.getElementById(""+id).classList.add('panelOpen');
    }
    else //אם הוא שונה תסגור
    {
      document.getElementById(""+id).classList.remove('panelOpen');
      document.getElementById(""+id).classList.add('panelClose');
    }
  }

  CloseAlert(close:boolean)
  {
    this.OpenAlert=close
    this.ToAlert={};
  }

}

