import { FormGroup,FormControl,Validators } from '@angular/forms';
import {AuthServiceService } from '../auth-service.service';
import { Component,EventEmitter,Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './login-model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  logindata !: any;

  formGroup = new FormGroup({
    
  });

  @Output() login = new EventEmitter<string>();
  
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
      this.formGroup = new FormGroup({
      emailid:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])

    });
  }

  initForm(){
  if(localStorage.getItem('token') != null)
  {
    location.replace("/home");     
  }
  }

  loginProcess()
   {
    if(this.formGroup.valid)
    {
      
      this.authService.login(this.formGroup.value).subscribe(result=>{
        
        if(result != null)
        {
         var ss = result.hasOwnProperty("role")
          const check =result as LoginModel;
          

          console.log("sowmi" + check.role);
          localStorage.setItem('Role',check.role);
          localStorage.setItem('token',check.token);
          localStorage.setItem('userid',check.userid);

        
          if(check.role == "Admin")
          {
            location.replace("/home");     
          }
          else
          {
            location.replace("/home");     
          }
          
        }
        else{
          alert("User Details Invalid!!!");
        }
      }
      )
    }
    else
    {
      alert('Please enter valid Email and Password!!');
    }
  }

}



