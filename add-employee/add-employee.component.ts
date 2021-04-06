import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {


  countryPost: any[] = [];


  constructor(private service: EmployeeServiceService, private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllCountries();
  }

  getAllCountries() {
    this.service.getAllCountries().subscribe((countries) => {
      this.countryPost = (<any>countries);

    })
  }

  addEmployee(name, email, phone, address, dept, status, countryid) {
    console.log(countryid.value)
    let empObj = {
      name: name.value,
      phoneno: phone.value,
      email: email.value,
      address: address.value,
      departmentit: dept.value,
      status: status.value,
      createdby: sessionStorage.getItem('username'),
      updatedby: sessionStorage.getItem('username'),
      country: {
        cid: countryid.value
      }
    }

    this.service.addEmployee(empObj).subscribe((response) => {
      console.log(response);

      this.toastrService.success(response)

      name.value = ''; phone.value = ''; dept.value = ''; status.value = '';
      countryid.value = '';
    });
  }

  backToHome() {
    this.router.navigate(["/home"]);
  }
}
