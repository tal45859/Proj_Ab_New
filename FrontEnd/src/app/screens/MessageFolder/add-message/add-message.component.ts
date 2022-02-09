import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/Message';
import { ResponseValidation } from 'src/app/model/ResponseValidation';
import { MessageService } from 'src/app/services/Message.service';
import { MessageValidationService } from 'src/app/services/MessageValidation.service';

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {

  public ToAlert:ResponseValidation={};
  public OpenAlert=false;
  public AddMessage:Message={};
  public Response:Array<ResponseValidation>=[
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''},
    {Isok:true,Message:''}
  ];
  constructor(private HttpMessage:MessageService ,private MessageValidation:MessageValidationService) { }

  ngOnInit(): void {
  }
  async OnAddMessage()
  {
    //להמשיך ולדידציה
    //ולשנות
    this.Response[0] = await this.MessageValidation.CheckFirstName(this.AddMessage.FirstName);
    this.Response[1] = await this.MessageValidation.CheckLastName(this.AddMessage.LastName);
    this.Response[2] = await this.MessageValidation.CheckEmail(this.AddMessage.Email);
    this.Response[3] = await this.MessageValidation.CheckPhone(this.AddMessage.Phone);
    this.Response[4] = await this.MessageValidation.CheckHeader(this.AddMessage.Header);
    this.Response[5] = await this.MessageValidation.CheckBody(this.AddMessage.Body);

    if(!this.Response[0].Isok || !this.Response[1].Isok ||
       !this.Response[2].Isok || !this.Response[3].Isok ||
       !this.Response[4].Isok || !this.Response[5].Isok )
       {
         return;
       }
       try
       {
        await this.HttpMessage.AddMessage(this.AddMessage);
        this.ToAlert.Isok=false;
        this.ToAlert.Message="ההודעה נשלחה בהצלחה";
        this.OpenAlert=true;
        // alert("ההודעה נשלחה בהצלחה");
        this.AddMessage={};
       }
       catch
       {
        // alert("לא הצלחנו להוסיף את ההודעה אנא נסה שנית מאוחר יותר");
         this.ToAlert.Isok=true;
         this.ToAlert.Message="לא הצלחנו להוסיף את ההודעה אנא נסה שנית מאוחר יותר";
         this.OpenAlert=true;
       }
    }

    CloseAlert(close:boolean)
    {
      this.OpenAlert=close
      this.ToAlert={};
    }
}
