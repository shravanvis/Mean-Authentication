import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../servces/validate.service';
import { AuthService } from './../servces/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name: string;
email: string;
username: string;
password: string;

  constructor(private validateService: ValidateService,
              private authSerice: AuthService,
              private router: Router) { }

  ngOnInit() {
  }


  onRegsiterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    }


    // required fields
    if(!this.validateService.validateRegister(user)){
      console.log('Please fill all the fields');
      return false;
    }

    // if(!this.validateService.validateRegister(user.email)){
    //   console.log('Please use a valid Email');
    //   return false;
    // }

    // register user
    this.authSerice.registerUser(user).subscribe(data => {
      if(data.succes){
        console.log('You are now registered');
        this.router.navigate(['/login']);
      } else{
        console.log('something went wrong');
        this.router.navigate(['/register']);
      }
    })

  }
}
