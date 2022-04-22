import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlineComponent } from './Admin/airline/airline.component';
import { LoginComponent } from './login/login.component';
import { FlightComponent } from './Admin/flight/flight.component';
import { ScheduleComponent } from './Admin/schedule/schedule.component';
import { DiscountComponent } from './Admin/discount/discount.component';
import { RegisterComponent } from './register/register.component';
import { FlightBookingComponent } from './User/flight-booking/flight-booking.component';


const routes: Routes = [
  {path:'airline',component:AirlineComponent},
  {path:'login',component:LoginComponent},
  {path:'flight',component:FlightComponent},
  {path:'schedule',component:ScheduleComponent},
  {path:'discount',component:DiscountComponent},
  {path:'register',component:RegisterComponent},
  {path:'booking',component:FlightBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
