import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
constructor(private router :Router){}
  
gettoken()
{
  return !!localStorage.getItem("token");  

}


  canActivate():boolean
  {
       if(!this.gettoken())
       {
         this.router.navigateByUrl("/login")
       }
         return this.gettoken();
    
  }
  
}
