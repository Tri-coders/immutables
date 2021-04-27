import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { AuthenticationService } from './authentication.service'
import Swal from 'sweetalert2'

@Injectable()
export class AuthGuardService implements CanActivate{
  constructor(private auth: AuthenticationService, private router: Router) {}
  async canActivate(){
    if(!this.auth.isLoggedIn()){

      ///////If login expiers then send logs to server
      if(this.auth.userExsist){
        this.auth.sendtoserver();
        this.auth.userExsist = false;
      }
      ///////If login expiers then send logs to server
      var temp = await Swal.fire({
        title: 'You need to Login first',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        return (result.value)
      })
      //alert("You need to Login first")
      this.router.navigateByUrl('/Login')
      return false
    }
    return true
  }

  
}
