import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  constructor(private fb: FormBuilder,private userService: UserService, private router: Router,) {
    let formControls = {
      firstname: new FormControl('',
        [Validators.required,
        Validators.pattern("[a-z . '-]+"),
        Validators.minLength(2)]
      ),
      lastname: new FormControl('',
        [Validators.required,
        Validators.pattern("[a-z . '-]+"),
        Validators.minLength(2)
        ]),

      email: new FormControl('',
        [Validators.required,
        Validators.email
        ]),
      password: new FormControl('',
        [Validators.required,
        Validators.minLength(6)
        ]),
      repassword: new FormControl('',
        [Validators.required,
        ]),
    }
    this.registerForm = this.fb.group(formControls)

  }
  get firstname() { return this.registerForm.get('firstname') }
  get lastname() { return this.registerForm.get('lastname') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get repassword() { return this.registerForm.get('repassword') }


  ngOnInit(): void {

    let isLoggedIn =this.userService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/dashboard'])
      
    }
  }


  register() {
    let data = this.registerForm.value;
    this.userService.registerAdmin(data).subscribe(
      res=>{
        this.router.navigate(['/login']);
      },
      err=>{
    console.log(err);
    
      }
    ) 
      }
    
    }
    
  
