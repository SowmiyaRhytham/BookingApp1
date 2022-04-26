import { baseUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  login(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/User/GetLogin',data,{responseType:'json'});
  }

  
  Signup(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/User/GetUserDetail',data,{responseType:'json'});
  }

  AddAirline(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/Airline/AddAirline',data,{responseType:'json'});
  }

  UpdatetAirline(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/Airline/UpdatetAirline',data,{responseType:'json'});
  }

  getAllAirline(data: any){
    return this.http.get<any>((baseUrl)+'/api/Airline',data);
  }


  AddFlight(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/Flight/AddFlight',data,{responseType:'json'});
  }

  UpdatetFlight(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/Flight/UpdatetFlight',data,{responseType:'json'});
  }

  getAllFlight(data: any){
    return this.http.get<any>((baseUrl)+'/api/Flight/GetAllFlight',data);
  }

  AddDiscount(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/Discount/AddDiscount',data,{responseType:'json'});
  }

  UpdatetDiscount(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/Discount/UpdateDiscount',data,{responseType:'json'});
  }

  getAllDiscount(data: any){
    return this.http.get<any>((baseUrl)+'/api/Discount/GetDiscountDetail',data);
  }


  AddSchedule(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/Schedule/Addschedule',data,{responseType:'json'});
  }

  UpdatetSchedule(data: Observable<any>){
    return this.http.post((baseUrl)+'/api/Schedule/Updatetschedule',data,{responseType:'json'});
  }

  getAllSchedule(data: any){
    return this.http.get<any>((baseUrl)+'/api/Schedule/GetScheduleDetail',data);
  }

  findFlight(data: any){
    // https://localhost:5001/api/Booking/GetBookingDetail?Source=CBE&Destination=CHN&Fromdate=2022-04-28&Todate=2022-04-28

    var url = baseUrl+'/api/Booking/GetBookingDetail?Source='+data['Source']+'&Destination='
    +data['Destination']+'&Fromdate='+data['ArrivalTime']+'&Todate='+data['DepatureTime'];
    return this.http.get<any>(url);
  }

  BookingHistory(data: any){
    var url = baseUrl+'/api/Booking/GetBookingHistory?userid='+data['Userid']
    return this.http.get<any>(url);
  }

  PassengerDetail(data: any){
    var url = baseUrl+'/api/Booking/GetPassangerDetails?PNRID='+data['PNRID']
    return this.http.get<any>(url);
  }


  CancelBooking(data: any){
    var url = baseUrl+'/api/Booking/CancelBooking?Passengerid='+data['Passengerid']
    return this.http.get<any>(url);
  }

}
