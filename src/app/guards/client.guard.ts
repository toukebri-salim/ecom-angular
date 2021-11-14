import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate,CanActivateChild {
  constructor(private  userservice : UserService, private router : Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
let isLoggedIn =this.userservice.isLoggedClient()
if (isLoggedIn) {
  return true;
  
}else {this.router.navigate(['/login']);
return false;

}

  }
  
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
let isLoggedIn =this.userservice.isLoggedClient()
if (isLoggedIn) {
  return true;
  
}else {this.router.navigate(['/login']);
return false;

}

  } 
  
}
