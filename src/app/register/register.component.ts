import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup = new FormGroup({
    
  });

  constructor(public authService:AuthServiceService) { }

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
        location.replace("/login");
       }
      });
    }
    else
    {
      alert('Please enter all the details!!');
    }
  }


}
