import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { MustMatch } from './_helpers/must-match.validator'
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router'

import Swal from 'sweetalert2'
@Component({
  selector: 'app-registrationapp',
  templateUrl: './registrationapp.component.html',
  styleUrls: ['./registrationapp.component.scss']
})
export class RegistrationappComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    credentials: TokenPayload = {
        id: 0,
        name: "",
        email: "",
        password: ""
    }

    constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['',[Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
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
        this.auth.register(this.credentials).subscribe(
            (data)=>{
                if(data.error){
                    Swal.fire({
                        title: data.error.toString(),
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        return (true)
                    })
                }else{
                    this.fullscreen()
                    this.router.navigateByUrl('/Home')
                }
            },
            error=>{
                
                console.error(error)
            }
        )

      // display form values on success
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
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
