import { Component, OnInit } from '@angular/core';
import * as $ from "jQuery";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {

  bookdata !: any;

    passengerdata: any[] = [];

  

  BookAddfrom = new FormGroup({    
  });

  PassengerAddfrom = new FormGroup({});

  constructor(private modalService: NgbModal,public authService:AuthServiceService) {}

  ngOnInit(): void {

    $('#tblFlight').hide();
    $('#tblPassenger').hide();
    $('#btnAdd').hide();
    $('#divSeat').hide();
    $('#btnDis').hide();
    $('#tblDiscount').hide();
    

    this.BookAddfrom = new FormGroup({
      Source:new FormControl('',[Validators.required]),
      Destination:new FormControl('',[Validators.required]),
      ArrivalTime:new FormControl('',[Validators.required]),
      DepatureTime:new FormControl('',[Validators.required])
    });

    this.PassengerAddfrom = new FormGroup({
      Name:new FormControl(''),
      Gender:new FormControl(''),
      Emailid:new FormControl(''),
      MealPreference:new FormControl(''),
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
  $('#divSeat').show();
  $('#btnAdd').show();

}



open(content:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  
  
  // this.PassengerAddfrom.patchValue({
  //   Name:"",
  //   Gender:"",
  //   Emailid:"",
  //   MealPreference:""
    
  // }); 
 
}


AddPassenger()
{
  this.modalService.dismissAll();
  $('#tblPassenger').show();
  console.log(this.PassengerAddfrom.value);
  this.passengerdata.push(this.PassengerAddfrom.value);
  $('#btnDis').show();
  $('#tblDiscount').show();
    

}

ApplyDiscount()
{
  
}



}
