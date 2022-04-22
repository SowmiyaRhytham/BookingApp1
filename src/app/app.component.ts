import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'BookingApp';
  isLoggedIn=false;
  
  constructor(
    public location: Location
  ) { 
      
      var pathString: string = location.path().toString().trim();
      console.log('appComponent: pathString...');
      console.log(pathString);  
      if(pathString == '/login' || pathString == '/register') 
      {
        console.log("hi");
         this.isLoggedIn=false;
      }
      else
      {
        this.isLoggedIn=true;
      }
      
  }

  
  onLogin(role:string)
  {
    console.log("helmas")
    if(role == "Admin")
    {
      $("#ddMaster").hide();
    }
    else
    {
      $("#ddMaster").hide();
    }
  }

}
