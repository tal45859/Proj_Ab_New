import { ResponseValidation } from './../model/ResponseValidation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationUserService {

constructor() { }



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

    public CheckPassword(Password:string):ResponseValidation
    {
      let Response:ResponseValidation={};
      if(Password==null ||Password.length==0)
      {
        Response.Isok=false;
        Response.Message="אנא הזן סיסמה!";
        return Response;
      }
      else if(Password.length<8)
      {
        Response.Isok=false;
        Response.Message="אורך סיסמה חייב להיות בין 8-16 תווים!";
        return Response;
      }
      //סיסמה חייבת להכיל לפחות מספר אות באנגלית אות בעברית וסימן
      else if(!/.*[a-z].*/.test(Password)||!/.*[0-9].*/.test(Password)||
      !/.*[A-Z].*/.test(Password)||
      !/[^a-zA-Z0-9 ]/.test(Password))
      {
        Response.Isok=false;
        Response.Message="סיסמה חייבת להכיל אותיות גדולות או קטנות באנגלית מספרים וסימנים או אותיות בעברית ללא רווחים!";
        return Response;
      }
      Response.Isok=true
      return  Response;
    }

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

    public CheckRole(Role:string):ResponseValidation
    {
      let Response:ResponseValidation={};
      if(Role == null || Role.length==0)
      {
        Response.Isok=false;
        Response.Message="אנא בחר תפקיד מהרשימה";
      }
      else if(Role=='Admin'||Role=='User')
      {
        Response.Isok=true;
        Response.Message="";
      }
      return Response;
    }
}
