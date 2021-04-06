import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private baseurl: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }


  getAllEmployees() {
    return (this.http.get(this.baseurl + 'getallemployee'));
  }

  getEmployeebyId(id) {
    return (this.http.get(this.baseurl + 'getemployeebyid/' + id));
  }

  getAllCountries() {
    return (this.http.get(this.baseurl + 'getallcountries'));
  }

  addEmployee(employee) {
    return (this.http.post(this.baseurl + 'saveemployee', employee, { responseType: 'text' }));
  }

  deleteEmployee(id) {
    return (this.http.delete(this.baseurl + 'deleteemployeebyid/' + id, { responseType: 'text' }));
  }

  updateEmployee(employee) {
    return (this.http.put(this.baseurl + 'updateemployee', employee, { responseType: 'text' }));
  }

  changeStatus(employee) {
    return (this.http.put(this.baseurl + 'changestatus', employee, { responseType: 'text' }));
  }

  loginCheck(obj) {
    return (this.http.post(this.baseurl + "login", obj));
  }



}
