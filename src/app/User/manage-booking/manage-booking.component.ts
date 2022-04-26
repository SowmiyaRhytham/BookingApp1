import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  constructor(private modalService: NgbModal,public authService:AuthServiceService) {}

  bookhistorydata:any;

  passengerdata:any;

  BookHistoryfrom = new FormGroup({    
  });

  ManageBookfrom= new FormGroup({

  });

  ngOnInit(): void {

    this.ManageBookfrom = new FormGroup({
      Passengerid:new FormControl(''),
      
    });

    this.GetBookingHistory();
  }


GetBookingHistory()
{
  //this.BookHistoryfrom.value["Userid"]=Number(localStorage.getItem("userid"));
  this.BookHistoryfrom.value["Userid"]=2;
    this.authService.BookingHistory(this.BookHistoryfrom.value).subscribe(result=>{ 
      console.log(result); 
      this.bookhistorydata=result;
      console.log(this.bookhistorydata);
  });
 
}

onCancel(row:any)
{

  console.log(row);

  this.ManageBookfrom.value["Passengerid"] = row;

  this.authService.CancelBooking(this.ManageBookfrom.value).subscribe(result=>{ 
  console.log(result); 
  });

}


}
