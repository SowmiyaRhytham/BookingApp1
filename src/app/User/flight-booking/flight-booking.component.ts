import { Component, OnInit } from '@angular/core';
import * as $ from "jQuery";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators, FormArray } from '@angular/forms';
import {DiscountModel} from 'src/app/User/flight-booking/flightdiscount-model'
import { ArgumentOutOfRangeError } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {

  bookdata !: any;

  roundtrip !:any;

  passengerdata: any[] = [];

  discountdata: any[] = [];

  OWBcost:any=0;
  OWNBcost:any=0;

  OWAirlineid:any=0;
  OWFlightid:any=0;
  OWScheduleid:any=0;
  OWDiscountid:any=0;

  
  RTBcost:any=0;
  RTNBcost:any=0;

  RTAirlineid:any=0;
  RTFlightid:any=0;
  RTScheduleid:any=0;
  RTDiscountid:any=0;

  BookAddform = new FormGroup({    
  });

  PassengerAddform = new FormGroup({});

  Discountform = new FormGroup({});

  AddBooking =new FormGroup({});

  constructor(private modalService: NgbModal,public authService:AuthServiceService,private router:Router) {}

  ngOnInit(): void {

    $('#tblFlight').hide();
    $('#tblPassenger').hide();
    $('#btnAdd').hide();
   // $('#divSeat').hide();
    $('#btnDis').hide();
    $('#tblDiscount').hide();
    $('#tblRoundtrip').hide();
    

    this.BookAddform = new FormGroup({
      Source:new FormControl('',[Validators.required]),
      Destination:new FormControl('',[Validators.required]),
      ArrivalTime:new FormControl('',[Validators.required]),
      DepatureTime:new FormControl('',[Validators.required]),
      Triptype:new FormControl('',[Validators.required])
    });

    this.PassengerAddform = new FormGroup({
      Name:new FormControl(''),
      Gender:new FormControl(''),
      Emailid:new FormControl(''),
      MealPreferences:new FormControl(''),
      PNRID:new FormControl(''),
      Status:new FormControl(''),
    });

    this.Discountform = new FormGroup({
      TotalAmount:new FormControl(''),
      Discount:new FormControl(''),
      AmountPaid:new FormControl(''),
      DiscountCode:new FormControl(''),
    });

  }


 Onfindflights()
{
  if($("#OW").is(":checked"))
  {
    this.BookAddform.value["Triptype"] = "OW";
    console.log(this.BookAddform.value);
    this.authService.findFlight(this.BookAddform.value).subscribe(result=>{
      console.log(result);
    this.modalService.dismissAll();
    this.bookdata=result;
    this.bookdata.forEach((e:any) => {
      e.selected=false;
    });                                                                              
    $('#tblFlight').show();
  });

  }

  else
  {
    this.BookAddform.value["Triptype"] = "OW";
    console.log(this.BookAddform.value);
    this.authService.findFlight(this.BookAddform.value).subscribe(result=>{
      this.modalService.dismissAll();
      this.bookdata=result;
      this.bookdata.forEach((e:any) => {
        e.selected=false;
      });                                                                              
      $('#tblFlight').show();
    });

    this.BookAddform.value["Triptype"] = "RT";

    this.authService.findFlight(this.BookAddform.value).subscribe(result=>{
    this.modalService.dismissAll();
    this.roundtrip=result;
    this.roundtrip.forEach((e:any) => {
      e.selected=false;
    });                                                                              
    $('#tblRoundtrip').show();
  });
    
  }
  

}

selectMe(row:any)
{
  row.selected=!row.selected;
  
  console.log(row);
  console.log(row.tickecostforbusiness);
  this.OWBcost=row.tickecostforbusiness;
  this.OWNBcost=row.tickecostfornonbusiness;
  this.OWAirlineid=row.airlineid;
  this.OWFlightid=row.flightid;
  this.OWScheduleid=row.scheduleid;

  //$('#divSeat').show();
  $('#btnAdd').show();

}

selectMeRT(row:any)
{
  row.selected=!row.selected;
  
  console.log(row);
  console.log(row.tickecostforbusiness);
  this.RTBcost=row.tickecostforbusiness;
  this.RTNBcost=row.tickecostfornonbusiness;
  this.RTAirlineid=row.airlineid;
  this.RTFlightid=row.flightid;
  this.RTScheduleid=row.scheduleid;

  //$('#divSeat').show();
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
  console.log(this.PassengerAddform.value);
  this.passengerdata.push(this.PassengerAddform.value);

  

  $('#btnDis').show();
  $('#tblDiscount').show();

  if(($("#OW").is(":checked")))
  {

  if($("#ddSeat option:selected").val() == "B")
  {
    this.Discountform.value["TotalAmount"]=this.OWBcost*this.passengerdata.length;
  }
  else
  {
    this.Discountform.value["TotalAmount"]=this.OWNBcost*this.passengerdata.length;
  }

   
   this.Discountform.value["Discount"]=0;
   this.Discountform.value["AmountPaid"]=this.Discountform.value["TotalAmount"];
   this.discountdata.push(this.Discountform.value);
   console.log(this.Discountform.value);
  }

  else
  {

    
  if($("#ddSeat option:selected").val() == "B")
  {
    this.Discountform.value["TotalAmount"]=this.OWBcost+this.RTBcost*this.passengerdata.length;
  }
  else
  {
    this.Discountform.value["TotalAmount"]=this.OWNBcost+this.RTNBcost*this.passengerdata.length;
  }

   
   this.Discountform.value["Discount"]=0;
   this.Discountform.value["AmountPaid"]=this.Discountform.value["TotalAmount"];
   this.discountdata.push(this.Discountform.value);
   console.log(this.Discountform.value);

  }
    

}

ApplyDiscount()
{
  this.Discountform.value["DiscountCode"] = $("#DiscountCode").val();


    this.authService.GetDiscountAmount(this.Discountform.value).subscribe(result=>{
    this.modalService.dismissAll();
    const check =result as DiscountModel[];
    console.log(result[0]);
    this.discountdata =[];
    this.OWDiscountid=check[0].discountid;
    this.RTDiscountid=check[0].discountid;
    
  if(($("#OW").is(":checked")))
  {

  if($("#ddSeat option:selected").val() == "B")
  {
    this.Discountform.value["TotalAmount"]=this.OWBcost*this.passengerdata.length;
  }
  else
  {
    this.Discountform.value["TotalAmount"]=this.OWNBcost*this.passengerdata.length;
  }

   
   this.Discountform.value["Discount"]=check[0].amount;
   this.Discountform.value["AmountPaid"]=this.Discountform.value["TotalAmount"] - check[0].amount;
   this.discountdata.push(this.Discountform.value);
}
else
{
  if($("#ddSeat option:selected").val() == "B")
  {
    this.Discountform.value["TotalAmount"]=this.OWBcost+this.RTBcost*this.passengerdata.length;
  }
  else
  {
    this.Discountform.value["TotalAmount"]=this.OWNBcost+this.RTNBcost*this.passengerdata.length;
  }

   
   this.Discountform.value["Discount"]=check[0].amount;
   this.Discountform.value["AmountPaid"]=this.Discountform.value["TotalAmount"] - check[0].amount;
   this.discountdata.push(this.Discountform.value);

}


  
});
}


Checkout()
{

  this.AddBooking = new FormGroup({
    Airlineid: new FormControl(''),
    Flightid:new FormControl(''),
    Scheduleid:new FormControl(''),
    Discountid:new FormControl(''),
    Userid:new FormControl(''),
    Triptype:new FormControl(''),
    Amount:new FormControl(''),
    Modepayment:new FormControl(''),
 
  });

  if(($("#OW").is(":checked")))
  {

  this.AddBooking.value["Airlineid"] = this.OWAirlineid;
  this.AddBooking.value["Flightid"] = this.OWFlightid;
  this.AddBooking.value["Scheduleid"] = this.OWScheduleid;
  this.AddBooking.value["Discountid"] = this.OWDiscountid;
  this.AddBooking.value["Userid"] = localStorage.getItem("userid");
  this.AddBooking.value["Triptype"] = "OneWay";
  this.AddBooking.value["Amount"] = this.Discountform.value["AmountPaid"];
  this.AddBooking.value["Modepayment"] = "Cash";

  this.authService.AddBooking(this.AddBooking.value).subscribe(result=>{ 
   console.log(result);
   console.log(this.passengerdata);
   this.PassengerAddform.value["PNRID"]=result;
   this.PassengerAddform.value["Status"]="Booked";
   this.authService.AddPassenger(this.passengerdata).subscribe(result=>{
    this.router.navigateByUrl("/home/BookingHistory");     
   });
});

  
  }
  else
  {

    this.AddBooking.value["Airlineid"] = this.OWAirlineid;
    this.AddBooking.value["Flightid"] = this.OWFlightid;
    this.AddBooking.value["Scheduleid"] = this.OWScheduleid;
    this.AddBooking.value["Discountid"] = this.OWDiscountid;
    this.AddBooking.value["Userid"] = localStorage.getItem("userid");
    this.AddBooking.value["Triptype"] = "OneWay";
    this.AddBooking.value["Amount"] = this.Discountform.value["AmountPaid"];
    this.AddBooking.value["Modepayment"] = "Cash";
  
    this.authService.AddBooking(this.AddBooking.value).subscribe(result=>{ 
     console.log(result);
     console.log(this.passengerdata);
     this.PassengerAddform.value["PNRID"]=result;
     this.PassengerAddform.value["Status"]="Booked";
     this.authService.AddPassenger(this.passengerdata).subscribe(result=>{
       
      
           
  this.AddBooking.value["Airlineid"] = this.RTAirlineid;
  this.AddBooking.value["Flightid"] = this.RTFlightid;
  this.AddBooking.value["Scheduleid"] = this.RTScheduleid;
  this.AddBooking.value["Discountid"] = this.RTDiscountid;
  this.AddBooking.value["Userid"] = localStorage.getItem("userid");
  this.AddBooking.value["Triptype"] = "Round Trip";
  this.AddBooking.value["Amount"] = this.Discountform.value["AmountPaid"];
  this.AddBooking.value["Modepayment"] = "Cash";

  
    this.authService.AddBooking(this.AddBooking.value).subscribe(result=>{ 
    console.log(result);
    this.PassengerAddform.value["PNRID"]=result;
    this.PassengerAddform.value["Status"]="Booked";
    this.authService.AddPassenger(this.passengerdata).subscribe(result=>{
      this.router.navigateByUrl("/home/BookingHistory"); 
    });
 });


     });
  });

  
  
  }

  
    
}


}
