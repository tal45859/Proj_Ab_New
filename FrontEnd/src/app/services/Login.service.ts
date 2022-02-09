import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endPointApi="https://localhost:44340/api/User/auth";

constructor(private http:HttpClient) {}

async GetAuth(auth:Login)
{
    return this.http.post(this.endPointApi,auth,{responseType: 'text' }).toPromise<any>();
}

    get ShareAuth():string
      {
        return window.sessionStorage.getItem("Auth");
      }
      set ShareAuth(val:string)
      {
        window.sessionStorage.setItem("Auth",val);
      }

      get ShareRole():string
      {
        return window.sessionStorage.getItem("Role");
      }
      set ShareRole(val:string)
      {
        window.sessionStorage.setItem("Role",val);
      }


      public getIPAddress()
      {
        return this.http.get("http://api.ipify.org/?format=json");
      }

  }
