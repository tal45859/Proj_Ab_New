import { ResponseValidation } from './../model/ResponseValidation';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageValidationService {

constructor() { }
  //תקציר
  ////////
  //בדיקת תמונה

  //בדיקת תמונה
  public CheckImage(ImageName:string):ResponseValidation
  {
    let MessageObj:ResponseValidation={};
    if(ImageName.endsWith(".jpg") || ImageName.endsWith(".jpeg") || ImageName.endsWith(".png"))
    {
      MessageObj.Isok=true;
      return MessageObj;
    }
    MessageObj.Message="אנא הכנס קובץ מסוג תמונה בלבד: png ,jpg , jpeg";
    MessageObj.Isok=false;
    return MessageObj;
  }
}
