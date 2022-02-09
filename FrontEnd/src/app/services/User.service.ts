import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endPointApi="https://localhost:44340/api/User";

  //תקציר
  /////////
  //בנאי
  //הזדאות
  //הוספת משתמש
  //בדיקה האם קיים מייל במערכת
  //JWT קבלת משתמש על פי
  //קבלת כל המשתמשים
  //קבלת משתמש בודד לפי מייל
  //JWT עדכון משתמש על פי
  //JWT מחיקת משתמש על פי
  //מחיקת משתמש מוגבל למנהל

 //בנאי
constructor(private http:HttpClient) { }

  //הוספת משתמש
  async AddUser(obj:User,header:any)
  {
    return this.http.post(this.endPointApi+"/AddUser",obj, {
      headers: new HttpHeaders().set('Authorization', header)
      }).toPromise<any>();
  };

  //בדיקה האם קיים מייל במערכת
  async CheckEmail(Email:string,header:any)
  {
    return this.http.get(this.endPointApi+"/CheckEmail/"+Email, {
      headers: new HttpHeaders().set('Authorization', header)
      }).toPromise<any>();
  }

  //JWT קבלת משתמש על פי
  async GetUserByJWT(header:any)
  {
    return this.http.get(this.endPointApi+"/GetUserByJWT", {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //קבלת כל המשתמשים
  async GetAllUser(header:any)
  {
    return this.http.get(this.endPointApi+"/GetAllUsers", {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //קבלת משתמש בודד לפי מייל
  async GetSingleUserByMail(mail:string,header:any)
  {
    return this.http.get(this.endPointApi+"/GetSingleUserByMail/"+mail, {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //JWT עדכון משתמש על פי
  async UpdateUser(obj:User,header:any)
  {
    return this.http.put(this.endPointApi+"/UpdateUserByJWT",obj, {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //JWT מחיקת משתמש על פי
    async DeleteUser (header:any)
  {
    return this.http.delete(this.endPointApi+"/DeleteUserByJWT", {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

  //מחיקת משתמש מוגבל למנהל
  async DeleteUserForAdmin (id:number,header:any)
  {
    return this.http.delete(this.endPointApi+"/DeleteUserForAdmin/"+id, {
      headers: new HttpHeaders().set('Authorization', header),
    }).toPromise<any>();
  };

}
