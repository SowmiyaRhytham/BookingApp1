import { Component, OnInit } from '@angular/core';
import * as $ from "jQuery";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})

export class DiscountComponent implements OnInit {
  discountdata !: any;

  constructor(private modalService: NgbModal,public authService:AuthServiceService) {}

  
  DiscountAddfrom = new FormGroup({    
  });


  ngOnInit(): void {
    
    $('#btnSave').hide();
    $('#btnUpdate').hide();

    this.DiscountAddfrom = new FormGroup({
      Airlinename:new FormControl('',[Validators.required]),
      Address:new FormControl('',[Validators.required]),
      Contactnumber:new FormControl('',[Validators.required]),
      IsBlock:new FormControl('')
  });
     this.GetAllDiscount();    
  }



  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    $('input[type="checkbox"]').prop("checked",false);
    $('#btnSave').show();
    $('#btnUpdate').hide();

    this.DiscountAddfrom.patchValue({
      Airlinename:"",
      Address:"",
      Contactnumber:"",
      isBlock:""
    }); 
   
  } 


onEdit(content:any,row:any)
{
  
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

  console.log(this.DiscountAddfrom.patchValue);

  $('#btnSave').hide();
  $('#btnUpdate').show();

  this.DiscountAddfrom.patchValue({
    Airlinename:row.airlinename,
    Address:row.address,
    Contactnumber:row.contactnumber,
    isBlock:row.isBlock
    
  }); 
  
}  

  AddDiscount()
  {
    if(this.DiscountAddfrom.valid)
    {  
     
      this.authService.AddAirline(this.DiscountAddfrom.value).subscribe(result=>{
        this.modalService.dismissAll();
        alert("Airline Added Successfully!!!");
        this.GetAllDiscount();  
    });
    
    }
    else
    {
      alert('Please enter all the details!!');
    }
  }


  UpdateDiscount()
  {
    if(this.DiscountAddfrom.valid)
    {  
      
      this.authService.UpdatetAirline(this.DiscountAddfrom.value).subscribe(result=>{ 
        this.modalService.dismissAll();
        alert("Airline Updated Successfully!!!");
        this.GetAllDiscount();  
    });
    
    }
    else
    {
      alert('Please enter all the details!!');
    } 
  }


GetAllDiscount()
  {
      this.authService.getAllAirline(this.DiscountAddfrom.value).subscribe(result=>{ 
        console.log(result); 
        this.discountdata=result;
        console.log(this.discountdata);
    });
   
  }


}


