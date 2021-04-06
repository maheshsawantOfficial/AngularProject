import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";

  incorrect: string = '';
  logindetails;

  constructor(private service: EmployeeServiceService, private router: Router) { }

  ngOnInit() {
    document.body.className = "bg-img"
  }

  ngOnDestroy(): void {
    document.body.className = "";
  }


  onSubmit(f) {
    console.log("Email Id " + f.value.email);
    console.log("Email Id " + f.value.password);
    let obj = {
      email: f.value.email,
      password: f.value.password
    }
    this.service.loginCheck(obj)
      .subscribe((response) => {

        console.log(response);
        this.logindetails = (<string>response);
        console.log("Messge is " + this.logindetails.msg);
        if (this.logindetails.msg === "valid") {
          console.log("username is " + this.logindetails.user.uname);
          sessionStorage.setItem("username", this.logindetails.user.uname);
          this.router.navigate(['/home']);

        } else {
          this.incorrect = this.logindetails.msg;
        }

      })


  }
}
