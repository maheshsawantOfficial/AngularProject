
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {


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
  };

  modalRef: BsModalRef;
  config = {
    animated: true,
    ignoreBackdropClick: true,
    class: "alert alert-danger"
  }

  constructor(private route: ActivatedRoute, private service: EmployeeServiceService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getEmployeeDetails();
  }

  getEmployeeDetails() {
    this.route.paramMap.subscribe((param) => {
      console.log(param.get('id'));
      let myId = param.get('id');
      this.getEmployeebyId(myId);
    })
  }

  getEmployeebyId(myId) {
    this.service.getEmployeebyId(myId).subscribe((response) => {
      console.log(response);
      this.employee = (<any>response);
    });
  }

  closePopup() {
    this.modalRef.hide();
    this.getEmployeeDetails();
  }


  onClickUpdate(popUp: TemplateRef<any>) {

    this.modalRef = this.modalService.show(popUp, this.config);

  }

}
