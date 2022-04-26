import { Component, OnInit } from '@angular/core';
import * as $ from "jQuery";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {
  scheduledata !: any;

  ScheduleAddfrom = new FormGroup({    
  });

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

    this.ScheduleAddfrom = new FormGroup({
    AirlineId:new FormControl('',[Validators.required]),
    FlightId:new FormControl('',[Validators.required]),
    ArrivalTime:new FormControl('',[Validators.required]),
    DepatureTime:new FormControl('',[Validators.required]),
    Arrival:new FormControl('',[Validators.required]),
    Depature:new FormControl('',[Validators.required]),
    Source:new FormControl('',[Validators.required]),
    Destination:new FormControl('',[Validators.required]),
    ScheduleDays:new FormControl('',[Validators.required]),
    TicketCostForBusiness:new FormControl('',[Validators.required]),
    TicketCostForNonBusiness:new FormControl('',[Validators.required]),
    MealPreference:new FormControl('',[Validators.required]),

  });

  this.GetAllSchedule(); 
  this.GetAllFlight();
  this.GetAllAirline()

  }



  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    $('input[type="checkbox"]').prop("checked",false);
    $('#btnSave').show();
    $('#btnUpdate').hide();
  
    this.ScheduleAddfrom.patchValue({
    AirlineId:"",
    FlightId:"",
    ArrivalTime:"",
    DepatureTime:"",
    Arrival:"",
    Depature:"",
    Source:"",
    Destination:"",
    ScheduleDays:"",
    TicketCostForBusiness:"",
    TicketCostForNonBusiness:"",
    MealPreference:"",
    }); 
   
  } 
  
  
  onEdit(content:any,row:any)
  {
  
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  
  console.log(this.ScheduleAddfrom.patchValue);
  
  $('#btnSave').hide();
  $('#btnUpdate').show();
  
  this.ScheduleAddfrom.patchValue({
    AirlineId:row.airlineid,
    FlightId:row.flightid,
    ArrivalTime:row.arrivaltime,
    DepatureTime:row.depaturetime,
    Arrival:row.arrivaltime,
    Depature:row.depaturetime,
    Source:row.depaturetime,
    Destination:row.depaturetime,
    ScheduleDays:row.isBlock,
    TicketCostForBusiness:row.isBlock,
    TicketCostForNonBusiness:row.isBlock,
    MealPreference:row.isBlock,
  }); 
  
  }  
  
  AddSchedule()
  {
    //alert($("#ddAirline option:selected").val());
    this.ScheduleAddfrom.value["AirlineId"] = Number($("#ddAirline option:selected").val());
    this.ScheduleAddfrom.value["FlightId"] = Number($("#ddFlight option:selected").val());
    this.ScheduleAddfrom.value["ScheduleDays"] = ($("#ddSchedule option:selected").val());
    this.ScheduleAddfrom.value["MealPreference"] = ($("#ddMealPreference option:selected").val());

    console.log(this.ScheduleAddfrom.value["AirlineId"]);
//    if(this.ScheduleAddfrom.valid)
  //  {  
      this.authService.AddSchedule(this.ScheduleAddfrom.value).subscribe(result=>{
        this.modalService.dismissAll();
        alert("Schedule Added Successfully!!!");
        this.GetAllSchedule();  
    });
    
    //}
    //else
    //{
      //alert('Please enter all the details!!');
    //}
  }
  
  
  UpdateSchedule()
  {
    if(this.ScheduleAddfrom.valid)
    {  
      this.authService.UpdatetSchedule(this.ScheduleAddfrom.value).subscribe(result=>{ 
        this.modalService.dismissAll();
        alert("Schedule Updated Successfully!!!");
        this.GetAllSchedule();  
    });
    
    }
    else
    {
      alert('Please enter all the details!!');
    } 
  }
  
  
  GetAllSchedule()
  {
      this.authService.getAllSchedule(this.ScheduleAddfrom.value).subscribe(result=>{ 
        console.log(result); 
        this.scheduledata=result;
        console.log(this.scheduledata);
    });
   
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
