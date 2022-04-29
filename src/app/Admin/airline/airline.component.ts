import { Component, OnInit } from '@angular/core';
import * as $ from "jQuery";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})

export class AirlineComponent implements OnInit {
  airlinedata !: any;
  isBlocked : boolean = false;

  constructor(private modalService: NgbModal,public authService:AuthServiceService) {}

  
  AirlineAddfrom = new FormGroup({    
  });


  ngOnInit(): void {
    
    $('#btnSave').hide();
    $('#btnUpdate').hide();

    this.AirlineAddfrom = new FormGroup({
      Airlinename:new FormControl('',[Validators.required]),
      Address:new FormControl('',[Validators.required]),
      Contactnumber:new FormControl('',[Validators.required]),
      IsBlock:new FormControl('')
});
this.GetAllAirline();    
  }



  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    $('input[type="checkbox"]').prop("checked",false);
    $('#btnSave').show();
    $('#btnUpdate').hide();

    this.AirlineAddfrom.patchValue({
      Airlinename:"",
      Address:"",
      Contactnumber:"",
      isBlock:""
    }); 
   
  } 


onEdit(content:any,row:any)
{
  
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

  console.log(this.AirlineAddfrom.patchValue);

  $('#btnSave').hide();
  $('#btnUpdate').show();

  
  
  this.AirlineAddfrom.patchValue({
    Airlinename:row.airlinename,
    Address:row.address,
    Contactnumber:row.contactnumber,
    isBlock:row.isBlock,
    Airlineid:row.airlineid
  }); 
  
  this.isBlocked=row.isBlock;
}  

  AddAirline()
  {
    if(this.AirlineAddfrom.valid)
    {  
     
      let isChecked = $('input[type="checkbox"]').prop("checked");

      console.log(isChecked);
      
      this.AirlineAddfrom.value["IsBlock"] = isChecked;
      
      this.authService.AddAirline(this.AirlineAddfrom.value).subscribe(result=>{
        this.modalService.dismissAll();
        alert("Airline Added Successfully!!!");
        this.GetAllAirline();  
    });
    
    }
    else
    {
      alert('Please enter all the details!!');
    }
  }


  UpdateAirline()
  {

    console.log(this.AirlineAddfrom.value);
    if(this.AirlineAddfrom.valid)
    { 
      let isChecked = $('input[type="checkbox"]').prop("checked");

      console.log(isChecked);
      this.AirlineAddfrom.value["IsBlock"] = isChecked;
      
      this.authService.UpdatetAirline(this.AirlineAddfrom.value).subscribe(result=>{ 
        this.modalService.dismissAll();
        alert("Airline Updated Successfully!!!");
        this.GetAllAirline();  
    });
    
    }
    else
    {
      alert('Please enter all the details!!');
    } 
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


