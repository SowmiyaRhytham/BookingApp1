import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AirlineComponent } from './Admin/airline/airline.component';
import { LoginComponent } from './login/login.component';
import * as $ from "jQuery";
import { FormsModule } from '@angular/forms';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightComponent } from './Admin/flight/flight.component';
import { ScheduleComponent } from './Admin/schedule/schedule.component';
import { DiscountComponent } from './Admin/discount/discount.component';
import { RegisterComponent } from './register/register.component';
import { BookingComponent } from './user/booking/booking.component';
import { FlightBookingComponent } from './User/flight-booking/flight-booking.component';



@NgModule({
  declarations: [
    AppComponent,
    AirlineComponent,
    LoginComponent,
    FlightComponent,
    ScheduleComponent,
    DiscountComponent,
    RegisterComponent,
    BookingComponent,
    FlightBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    
 }
