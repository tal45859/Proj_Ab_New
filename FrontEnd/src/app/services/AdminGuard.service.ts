import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  public Auth:string;
  public Role:string;
constructor(private httpLogin:LoginService)
 {
  this.Auth=this.httpLogin.ShareAuth;
  this.Role=this.httpLogin.ShareRole;
 }
 //תקציר
 ///////
 //שומר שרק מנהל יוכל להיכנס

 //שומר שרק מנהל יוכל להיכנס
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
  {
    return this.Auth != null && this.Role == "Admin" ;
  }
}
