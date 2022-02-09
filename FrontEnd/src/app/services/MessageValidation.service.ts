import { Injectable } from '@angular/core';
import { ResponseValidation } from '../model/ResponseValidation';

@Injectable({
  providedIn: 'root'
})
export class MessageValidationService {

constructor() { }
 // תקציר
 /////////
 //בדיקת שם פרטי
 //בדיקת שם משפחה
 //בדיקת מייל
 //בדיקת הכותרת
 //בדיקת גוף ההודעה
 //בדיקת טלפון

  //בדיקת שם פרטי
  public CheckFirstName(FirstName:string):ResponseValidation
  {
  let Response:ResponseValidation={};
  //בדיקה האם המחרוזת ריקה
  if( FirstName==null || FirstName.length==0)
  {
    Response.Isok=false;
    Response.Message="אנא הזן שם פרטי!";
    return Response;
  }
  //בדיקה אם קיים במחרוזת תווים אסורים
    else if(/[^a-zA-Zא-ת ]/.test(FirstName))
    {
      Response.Isok=false;
      Response.Message="אנא הזן אותיות באנגלית או בעברית בלבד!";
      return Response;
    }
    Response.Isok=true
    return  Response;
  }

  //בדיקת שם משפחה
  public CheckLastName(LastName:string):ResponseValidation
  {
    let Response:ResponseValidation={};
    //בדיקה האם המחרוזת ריקה
    if(LastName==null || LastName.length==0)
    {
     Response.Isok=false;
     Response.Message="אנא הזן שם משפחה!";
     return Response;
    }
    //בדיקה אם קיים במחרוזת תווים אסורים
     else if(/[^a-zA-Zא-ת ]/.test(LastName))
     {
       Response.Isok=false;
       Response.Message="אנא הזן אותיות באנגלית או בעברית בלבד!";
       return Response;
     }
     Response.Isok=true
     return  Response;
  }

  //בדיקת מייל
  public CheckEmail(Email:string):ResponseValidation
    {
      let Response:ResponseValidation={};
      if(Email==null || Email.length==0)
      {
        Response.Isok=false;
        Response.Message="אנא הזן מייל!";
        return Response;
      }
      else if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email))
      {
        Response.Isok=true;
        return Response;
      }
      Response.Isok=false;
      Response.Message="אנא הזן מייל תקין";
      return Response;
    }

    //בדיקת הכותרת
    public CheckHeader(Header:string):ResponseValidation
    {
      let Response:ResponseValidation={};
      //בדיקה האם המחרוזת ריקה
      if(Header==null || Header.length==0)
      {
       Response.Isok=false;
       Response.Message="אנא הזן נושא פניה!";
       return Response;
      }
      //בדיקה אם קיים במחרוזת תווים אסורים
       else if(/[^a-zA-Zא-ת0-9 ]/.test(Header))
       {
         Response.Isok=false;
         Response.Message="אנא הזן אותיות באנגלית, בעברית ומספרים בלבד!";
         return Response;
       }
       Response.Isok=true
       return  Response;
    }

    public CheckBody(Body:string):ResponseValidation
    {
      let Response:ResponseValidation={};
      //בדיקה האם המחרוזת ריקה
      if(Body==null || Body.length==0)
      {
       Response.Isok=false;
       Response.Message="אנא הזן את גוף הבקשה!";
       return Response;
      }
       Response.Isok=true
       return  Response;
    }

    //בדיקת טלפון
    public CheckPhone(Phone:string):ResponseValidation
    {
      let Response:ResponseValidation={};
      //בדיקה האם המחרוזת ריקה
      if(Phone==null || Phone.length==0)
      {
       Response.Isok=false;
       Response.Message="אנא הזן מספר טלפון!";
       return Response;
      }
      //בדיקה אם קיים במחרוזת תווים אסורים
       else if(/[^*0-9]/.test(Phone))
       {
         Response.Isok=false;
         Response.Message="אנא הזן מספרים בלבד!";
         return Response;
       }
       Response.Isok=true
       return  Response;
    }

}
