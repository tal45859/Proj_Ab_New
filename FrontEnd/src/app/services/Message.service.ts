import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  endPointApi="https://localhost:44340/api/Message";

    //תקציר
    ///////////
    //בנאי
    //הוספת הודעה
    //קבלת כל ההודעות
    //קבלת הודעה לפי מייל
    //מחיקת הודעה

    //בנאי
  constructor(private http:HttpClient) { }

    //הוספת הודעה
    async AddMessage(obj:Message)
    {
      return this.http.post(this.endPointApi+"/AddMessage",obj).toPromise<any>();
    };

    //קבלת כל ההודעות
    async GetAllMessage(header:any)
    {
      return this.http.get(this.endPointApi+"/GetAllMessages", {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    };

    //קבלת הודעה לפי מייל
    async GetSingleMessageByMail(mail:string,header:any)
    {
      return this.http.get(this.endPointApi+"/GetSingleMessageByMail/"+mail, {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    };

    //מחיקת הודעה
    async DeleteMessage (id:number,header:any)
    {
      return this.http.delete(this.endPointApi+"/DeleteMessage/"+id, {
        headers: new HttpHeaders().set('Authorization', header),
      }).toPromise<any>();
    };
}
