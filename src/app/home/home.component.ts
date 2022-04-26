import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router:Router) { }
  isLoggedIn=true;

  

  ngOnInit(): void {
    this.home();
  }

  home()
  {
    //alert(localStorage.getItem('Role'));
    if(localStorage.getItem('Role')?.toString() == "Admin")
  {

    this.router.navigateByUrl("/home/airline");     

  }
  else
  {
    //alert();
    this.isLoggedIn = false; 
    this.router.navigateByUrl("/home/booking");     
  }

 
  }
  
}
