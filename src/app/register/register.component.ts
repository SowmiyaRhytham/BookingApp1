import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup = new FormGroup({
    
  });

  constructor(public authService:AuthServiceService,private router:Router) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name:new FormControl('',[Validators.required]),
      emailid:new FormControl('',[Validators.required,Validators.email]),
      phonenumber:new FormControl('',[Validators.required])

    });
  }



  signupProcess()
   {
     console.log(this.formGroup.value);
    if(this.formGroup.valid)
    {
      
      this.authService.Signup(this.formGroup.value).subscribe(result=>{
       if(result != null)
       {
        alert('User Register Successfully!!');
        this.router.navigateByUrl("/login");
       }
      });
    }
    else
    {
      alert('Please enter all the details!!');
    }
  }


}
