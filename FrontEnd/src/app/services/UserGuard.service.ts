import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {
  public Auth:string;
constructor(private httpLogin:LoginService)
 {
  this.Auth=this.httpLogin.ShareAuth;
 }
 //תקציר
 ///////
 //שומר שרק משתמש ומנהל יוכלו להיכנס

 //שומר שרק משתמש ומנהל יוכלו להיכנס
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  {
    return this.Auth!=null;
  }
}
