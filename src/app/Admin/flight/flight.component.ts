import { Component, OnInit } from '@angular/core';
import * as $ from "jQuery";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})

export class FlightComponent implements OnInit {
  flightdata !: any;
  airlinedata !: any;

  
  FlightAddfrom = new FormGroup({    
  });

  AirlineAddfrom = new FormGroup({    
  });


  constructor(private modalService: NgbModal,public authService:AuthServiceService) {}

  ngOnInit(): void {
        
    $('#btnSave').hide();
    $('#btnUpdate').hide();

    this.AirlineAddfrom = new FormGroup({
      Airlinename:new FormControl('',[Validators.required]),
      Address:new FormControl('',[Validators.required]),
      Contactnumber:new FormControl('',[Validators.required]),
      IsBlock:new FormControl('')
});

    this.FlightAddfrom = new FormGroup({
      AirlineId:new FormControl([Validators.required]),
      InstrumentUsed:new FormControl('',[Validators.required]),
      TotalSeats:new FormControl('',[Validators.required]),
      TotalBusinessSeats:new FormControl('',[Validators.required]),
      TotalNonBusinessSeats:new FormControl('',[Validators.required])
  });
  this.GetAllFlight(); 
  this.GetAllAirline();
}


open(content:any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  $('input[type="checkbox"]').prop("checked",false);
  $('#btnSave').show();
  $('#btnUpdate').hide();

  this.FlightAddfrom.patchValue({
    Airlinename:"",
    Address:"",
    Contactnumber:"",
    isBlock:""
  }); 
 
} 


onEdit(content:any,row:any)
{

this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

console.log(this.FlightAddfrom.patchValue);

$('#btnSave').hide();
$('#btnUpdate').show();

this.FlightAddfrom.patchValue({
  InstrumentUsed:row.instrumentused,
  TotalSeats:row.totalseats,
  TotalBusinessSeats:row.totalbusinessseats,
  TotalNonBusinessSeats:row.totalnonbusinessseats
  
}); 

//$("#ddAirline option:selected").val(row.airlineid);
$("#ddAirline option[value='1']").attr("selected" , "selected");

}  

AddFlight()
{
  this.FlightAddfrom.value["AirlineId"] = Number($("#ddAirline option:selected").val());

  console.log($("#ddAirline option:selected").val());

 // if(this.FlightAddfrom.valid)
  //{  
    this.authService.AddFlight(this.FlightAddfrom.value).subscribe(result=>{
      this.modalService.dismissAll();
      alert("Flight Added Successfully!!!");
      this.GetAllFlight();  
  });
  
  //}
  //else
  //{
    //alert('Please enter all the details!!');
  //}
}


UpdateFlight()
{
  if(this.FlightAddfrom.valid)
  {  
    
    this.authService.UpdatetAirline(this.FlightAddfrom.value).subscribe(result=>{ 
      this.modalService.dismissAll();
      alert("Flight Updated Successfully!!!");
      this.GetAllFlight();  
  });
  
  }
  else
  {
    alert('Please enter all the details!!');
  } 
}


GetAllFlight()
{
    this.authService.getAllFlight(this.FlightAddfrom.value).subscribe(result=>{ 
      console.log(result); 
      this.flightdata=result;
      console.log(this.flightdata);
  });
 
}


GetAllAirline()
  {
      this.authService.getAllAirline(this.AirlineAddfrom.value).subscribe(result=>{ 
        console.log(result); 
        this.airlinedata=result;
        console.log(this.airlinedata);
    });
   
  }



}
