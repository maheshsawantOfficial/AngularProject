import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  @Input() empObject = {
    updatedby: ''
  };

  // id:string='';      
  // name:string='';
  // phoneno:string='';
  // email:string="";
  // address:string="";
  // departmentit:string='';
  // status:string=''
  // createdby:string='';
  // createddtm:string='';
  // // updatedby:string='';
  // cid:string=''; 

  countryPost: any[] = [];
  issubmitDissabled: boolean = true;
  msg: string = '';
  EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  constructor(private service: EmployeeServiceService,
    private toastrService: ToastrService) { }

  ngOnInit() {

    this.getAllCountries();
  }


  getAllCountries() {
    this.service.getAllCountries().subscribe((countries) => {
      this.countryPost = (<any>countries);

    })
  }





  updateEmployee() {

    this.empObject.updatedby = sessionStorage.getItem('username');

    this.service.updateEmployee(this.empObject).subscribe((myResponse) => {

      console.log(myResponse);
      // this.msg=myResponse;
      // alert(myResponse);
      this.toastrService.success(myResponse);
      this.issubmitDissabled = false;
    })
  }

  // backToHome(){
  //   this.router.navigate(["/home"]);
  // }
}





