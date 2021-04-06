import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { DialogService } from '../shared/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  empArr: any[] = [];
  myId: number = 9;
  nameSearch: string = '';

  employee: Employee = {
    id: '',
    name: '',
    phoneno: '',
    email: '',
    address: '',
    departmentit: '',
    status: '',
    createddtm: '',
    createdby: '',
    updatedby: '',
    updateddtm: '',
    country: {
      cid: '',
      cname: ''
    }
  }

  isSelected: boolean = false;
  modalRef: BsModalRef;
  config = {
    animated: true,
    ignoreBackdropClick: true,
    class: "alert alert-danger",

  }

  constructor(private service: EmployeeServiceService, private routes: Router,
    private modalService: BsModalService, private dialogService: DialogService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllEmployee();
  }

  //========get all data into table==========
  getAllEmployee() {

    this.service.getAllEmployees().subscribe((myResponse) => {
      console.log(myResponse);
      this.empArr = (<any>myResponse)
    })
  }



  selectEmp(emp) {
    this.isSelected = true;
    this.employee = emp;
  }

  isEmpSelected() {
    if (this.isSelected) {
      return true;
    } else {
      return false;
    }
  }

  onClickAdd() {

    this.routes.navigate(['/addemployee'])

  }

  closePopup() {
    this.modalRef.hide();
    this.getAllEmployee();
  }


  onClickUpdate(popUp: TemplateRef<any>) {
    if (!this.isEmpSelected()) {

      this.toastrService.error("Please select an employee...", 'ERROR', {
        positionClass: 'toast-bottom-center'
      });

    } else {
      this.modalRef = this.modalService.show(popUp, this.config);
      this.isSelected = false;

    }
  }


  onClickDelete() {
    if (!this.isEmpSelected()) {
      this.toastrService.error("Please select an employee...", 'ERROR', {
        positionClass: 'toast-bottom-center'
      });
    } else {
      this.dialogService.openConfigDialog('Are you sure to delete this record ?').afterClosed()
        .subscribe((response) => {
          console.log(response);

          if (response) {
            this.service.deleteEmployee(this.employee.id).subscribe((res) => {
              // alert(Response);

              this.toastrService.success(res);
              this.isSelected = false;
              this.getAllEmployee();
            });
          }
        })


    }
  }

  onClickStatus() {
    console.log(status);
    if (!this.isEmpSelected()) {
      this.toastrService.error("Please select an employee...", 'ERROR', {
        positionClass: 'toast-bottom-center'
      });
    } else {
      this.dialogService.openConfigDialog('Are you sure to change status of the Employee ?').afterClosed()
        .subscribe((response) => {
          console.log(response);

          if (response) {
            this.service.changeStatus(this.employee).subscribe((response) => {
              console.log(response);
              if (response === "Status of a Suspended Employee can not be changed..!") {
                this.toastrService.error(response, 'ERROR', {
                  positionClass: 'toast-bottom-center'

                })
                this.getAllEmployee();
              } else {
                this.toastrService.success(response);
                this.getAllEmployee();
              }
              this.isSelected = false;

            })
          }
        })

      this.employee.updatedby = sessionStorage.getItem('username');



    }

  }

}
