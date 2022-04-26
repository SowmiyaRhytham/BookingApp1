import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  constructor(private modalService: NgbModal,public authService:AuthServiceService) {}

  bookhistorydata:any;

  passengerdata:any;

  BookHistoryfrom = new FormGroup({    
  });


  ngOnInit(): void {
    this.BookHistoryfrom = new FormGroup({
      Userid:new FormControl(''),
      PNRID:new FormControl('')
    });

    this.GetBookingHistory();
  }


  onView(content:any,row:any)
  {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

  console.log(row.PNRID);

  this.BookHistoryfrom.patchValue({
    PNRID:row.pnrid
  });
  
  this.authService.PassengerDetail(this.BookHistoryfrom.value).subscribe(result=>{ 
    console.log(result); 
    this.passengerdata=result;
    console.log(this.passengerdata);
});

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



}
