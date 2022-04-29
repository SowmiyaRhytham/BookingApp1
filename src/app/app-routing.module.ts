import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlineComponent } from './Admin/airline/airline.component';
import { LoginComponent } from './login/login.component';
import { FlightComponent } from './Admin/flight/flight.component';
import { ScheduleComponent } from './Admin/schedule/schedule.component';
import { DiscountComponent } from './Admin/discount/discount.component';
import { RegisterComponent } from './register/register.component';
import { FlightBookingComponent } from './User/flight-booking/flight-booking.component';
import { HomeComponent } from './home/home.component';
import { BookingHistoryComponent } from './User/booking-history/booking-history.component';
import { ManageBookingComponent } from './User/manage-booking/manage-booking.component';
import { AuthguardGuard } from './authguard.guard';


const routes: Routes = [
  {path:"",redirectTo:'login',pathMatch:'full'},
  //{path:'airline',component:AirlineComponent},
  {path:'login',component:LoginComponent},
   {path:'register',component:RegisterComponent},
   
   {path:'home',component:HomeComponent,
  children : [
  {path:'airline',component:AirlineComponent,canActivate:[AuthguardGuard]},
  {path:'flight',component:FlightComponent},
  {path:'schedule',component:ScheduleComponent},
  {path:'discount',component:DiscountComponent},
  {path:'register',component:RegisterComponent},
  {path:'booking',component:FlightBookingComponent},
  {path:'BookingHistory',component:BookingHistoryComponent},
  {path:'ManageBooking',component:ManageBookingComponent},
  
 ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
