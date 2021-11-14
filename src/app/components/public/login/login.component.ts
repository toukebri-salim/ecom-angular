import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { UserService } from './../../../services/user.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,) {
    let formControls = {
      email: new FormControl('',
        [Validators.required,
        Validators.email
        ]
      ),
      password: new FormControl('',
        [Validators.required,
        Validators.minLength(6)]
      ),

    }
    this.loginForm = this.fb.group(formControls)
  }
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }


  ngOnInit(): void {
    let isLoggedIn =this.userService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/dashboard'])}

  //let isLoggedIn =this.userService.isLoggedIn();
   // if (isLoggedIn) {
    //  this.router.navigate(['/dashboard'])
    


    /*
login() {
    let data = this.loginForm.value;
this.userService.loginAdmin(user).subscribe(
  res=>{
    console.log(res);
    
    let token = res.token;
    localStorage.setItem("myToken",token);
    this.router.navigate(['/people-list']);

  },
    */
   
  }
  login() {
    let data = this.loginForm.value;

    this.userService.loginAdmin(data).subscribe(
      res => {
        let token = res.token;
        localStorage.setItem("myToken", token);
        this.router.navigate(['/dashboard']);

      },
      err => {
        console.log(err);

      }
    )
  }

}
