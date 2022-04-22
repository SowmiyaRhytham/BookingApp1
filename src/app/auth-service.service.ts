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


}
