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
      Discountcode:new FormControl('',[Validators.required]),
      Amount:new FormControl('',[Validators.required]),
      Expiryfromdate:new FormControl('',[Validators.required]),
      Expirytodate:new FormControl('',[Validators.required])
  });
     this.GetAllDiscount();    
  }



  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    $('input[type="checkbox"]').prop("checked",false);
    $('#btnSave').show();
    $('#btnUpdate').hide();

    this.DiscountAddfrom.patchValue({
    Discountcode:"",
    Amount:"",
    Expiryfromdate:"",
    Expirytodate:""
    }); 
   
  } 


onEdit(content:any,row:any)
{
  
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});

  console.log(this.DiscountAddfrom.patchValue);

  $('#btnSave').hide();
  $('#btnUpdate').show();

  this.DiscountAddfrom.patchValue({
    Discountcode:row.discountcode,
    Amount:row.amount,
    Expiryfromdate:row.expiryfromdate,
    Expirytodate:row.expirytodate
    
  }); 
  
}  



  AddDiscount()
  {
    if(this.DiscountAddfrom.valid)
    {  
    
       console.log( this.DiscountAddfrom.value["Expirytodate"]);

      this.authService.AddDiscount(this.DiscountAddfrom.value).subscribe(result=>{
        this.modalService.dismissAll();
        alert("Discount Added Successfully!!!");
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
      
      this.authService.UpdatetDiscount(this.DiscountAddfrom.value).subscribe(result=>{ 
        this.modalService.dismissAll();
        alert("Discount Updated Successfully!!!");
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
      this.authService.getAllDiscount(this.DiscountAddfrom.value).subscribe(result=>{ 
        console.log(result); 
        this.discountdata=result;
        console.log(this.discountdata);
    });
   
  }

}


