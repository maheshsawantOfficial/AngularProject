import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AuthGuard } from './auth.guard';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: "addemployee", component: AddEmployeeComponent, canActivate: [AuthGuard]
  },
  {
    path: "updateemployee", component: UpdateEmployeeComponent, canActivate: [AuthGuard]
  },

  {
    path: "login", component: LoginComponent
  },

  {
    path: "employeedetails/:id", component: EmployeeDetailsComponent, canActivate: [AuthGuard]
  },

  {
    path: "**", component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})




export class AppRoutingModule { }

export const componentImport = [HomeComponent,
  AddEmployeeComponent,
  UpdateEmployeeComponent,
  NotFoundComponent, LoginComponent, EmployeeDetailsComponent]
