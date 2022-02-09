import { Injectable } from '@angular/core';
import { ResponseValidation } from '../model/ResponseValidation';

@Injectable({
  providedIn: 'root'
})
export class PostValidationService {

constructor() { }
  //תקציר
  ////////
  //בדיקת כותרת
  //בדיגת פרטים נוספים

  //בדיקת כותרת
  public CheckHedaer(Header:string):ResponseValidation
  {
    let MessageObj:ResponseValidation={};
    if(Header=="" || Header==null)
    {
      MessageObj.Isok=false;
      MessageObj.Message="אנא הזן ערך לשדה כותרת !";
      return MessageObj;
    }
    MessageObj.Isok=true;
    return MessageObj;
  }

     //בדיגת פרטים נוספים
    public CheckAbout(About:string):ResponseValidation
    {
      let MessageObj:ResponseValidation={};
      if(About=="" || About==null)
      {
        MessageObj.Isok=false;
        MessageObj.Message="אנא הזן ערך לשדה פרטים נוספים !";
        return MessageObj;
      }
      MessageObj.Isok=true;
      return MessageObj;
    }
}
