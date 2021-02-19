import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-loginapp',
  templateUrl: './loginapp.component.html',
  styleUrls: ['./loginapp.component.scss']
})
export class LoginappComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  credentials: TokenPayload = {
    id: 0,
    name: "",
    email: "",
    password: ""
}

  constructor(private formBuilder: FormBuilder,private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
    
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.auth.login(this.credentials).subscribe(
        (data)=>{
            if(data.token){
              this.fullscreen()
              this.router.navigateByUrl('/Home')
              
            }else{
              alert(data.error)
            }
          },
        err=>{
            console.error(err)
        }
    )
      // display form values on success
      
  }
  ele = document.documentElement;
  fullscreen(){
    if(this.ele.requestFullscreen){
      this.ele.requestFullscreen();
    }
  }
  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
