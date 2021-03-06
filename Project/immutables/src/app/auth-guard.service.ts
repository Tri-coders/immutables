import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(private auth: AuthenticationService, private router: Router) {}
  canActivate(){
    if(!this.auth.isLoggedIn()){

      ///////If login expiers then send logs to server
      if(this.auth.userExsist){
        this.auth.sendtoserver();
        this.auth.userExsist = false;
      }
      ///////If login expiers then send logs to server
      alert("You need to Login first")
      this.router.navigateByUrl('/Login')
      return false
    }
    return true
  }

  
}
