import { Component, OnInit } from '@angular/core';
import * as $ from "jQuery";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';



@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {

  bookdata !: any;

  BookAddfrom = new FormGroup({    
  });

  constructor(private modalService: NgbModal,public authService:AuthServiceService) {}

  ngOnInit(): void {

    $('#tblFlight').hide();
    $('#tblPassenger').hide();

    this.BookAddfrom = new FormGroup({
      Source:new FormControl('',[Validators.required]),
      Destination:new FormControl('',[Validators.required]),
      ArrivalTime:new FormControl('',[Validators.required]),
      DepatureTime:new FormControl('',[Validators.required])
    });

  }


 Onfindflights()
{
  console.log(this.BookAddfrom.value);
  this.authService.findFlight(this.BookAddfrom.value).subscribe(result=>{
    this.modalService.dismissAll();
    this.bookdata=result;
    this.bookdata.forEach((e:any) => {
      e.selected=false;
    });                                                                              
    $('#tblFlight').show();
});


}

selectMe(row:any)
{
  
  row.selected=!row.selected;
  
  console.log(row);
  $('#tblPassenger').show();
}





}
