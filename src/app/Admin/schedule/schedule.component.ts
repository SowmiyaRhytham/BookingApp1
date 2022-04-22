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


  constructor(private modalService: NgbModal,public authService:AuthServiceService) {}

  ngOnInit(): void {

    
    $('#btnSave').hide();
    $('#btnUpdate').hide();

    this.ScheduleAddfrom = new FormGroup({
      AirlineId:new FormControl('',[Validators.required]),
      FlightId:new FormControl('',[Validators.required]),
      ArrivalTime:new FormControl('',[Validators.required]),
      DepatureTime:new FormControl('',[Validators.required]),
      ScheduleDays:new FormControl('',[Validators.required]),
      TicketCostForBusiness:new FormControl('',[Validators.required]),
      TicketCostForNonBusiness:new FormControl('',[Validators.required]),
      MealPreference:new FormControl('',[Validators.required]),

  });

  this.GetAllSchedule(); 

  }



  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    $('input[type="checkbox"]').prop("checked",false);
    $('#btnSave').show();
    $('#btnUpdate').hide();
  
    this.ScheduleAddfrom.patchValue({
      Airlinename:"",
      Address:"",
      Contactnumber:"",
      isBlock:""
    }); 
   
  } 
  
  
  onEdit(content:any,row:any)
  {
  
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  
  console.log(this.ScheduleAddfrom.patchValue);
  
  $('#btnSave').hide();
  $('#btnUpdate').show();
  
  this.ScheduleAddfrom.patchValue({
    Airlinename:row.airlinename,
    Address:row.address,
    Contactnumber:row.contactnumber,
    isBlock:row.isBlock
    
  }); 
  
  }  
  
  AddSchedule()
  {
    if(this.ScheduleAddfrom.valid)
    {  
      this.authService.AddAirline(this.ScheduleAddfrom.value).subscribe(result=>{
        this.modalService.dismissAll();
        alert("Flight Added Successfully!!!");
        this.GetAllSchedule();  
    });
    
    }
    else
    {
      alert('Please enter all the details!!');
    }
  }
  
  
  UpdateSchedule()
  {
    if(this.ScheduleAddfrom.valid)
    {  
      this.authService.UpdatetAirline(this.ScheduleAddfrom.value).subscribe(result=>{ 
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
      this.authService.getAllAirline(this.ScheduleAddfrom.value).subscribe(result=>{ 
        console.log(result); 
        this.scheduledata=result;
        console.log(this.scheduledata);
    });
   
  }
  

}
