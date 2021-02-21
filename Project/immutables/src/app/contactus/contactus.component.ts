import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import {
  AuthenticationService,
  EmailData
} from '../authentication.service';
import {
  Router
} from '@angular/router'
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contactus: FormGroup;
  submitted = false;
  credentials: EmailData = {
    phone: 0,
    name: "",
    email: "",
    message: "",
  }
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {}

  
  ///////////////////////FullScreen Exit////////////////////////
  @HostListener("document:fullscreenchange", []) 
  fullScreen() {
    if (document.fullscreenElement) {
        console.log(`Entered full-screen mode.`);
    } else {
        this.auth.logout()
    }
  }
  ////////////////////////////////////////////////////

  ngOnInit(): void {
    this.contactus = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      phone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      message: ['', [Validators.minLength(5), Validators.maxLength(500), Validators.required]]
    });
  }

  get f() {
    return this.contactus.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactus.invalid) {
      return;
    }
    this.auth.email(this.credentials).subscribe(
      (data) => {
        if (data.error) {
          alert(data.error)
        } else {
          alert(data.message)
          this.onReset()
        }

      },
      error => {
        console.error(error)
      }
    )
  }

  onReset() {
    this.submitted = false;
    this.contactus.reset();
  }
}
