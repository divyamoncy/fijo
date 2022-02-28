import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-borrowerdashboard',
  templateUrl: './borrowerdashboard.component.html',
  styleUrls: ['./borrowerdashboard.component.css']
})
export class BorrowerdashboardComponent implements OnInit {
  public show:number;
  public accountnumber: string;
  public ifsccode: string;
  public outstanding: number;
  public maturityDate: string;
  constructor(private router: Router, private dbService: DBService, private userService: UserService) {
    this.show = 1;
    this.accountnumber = "";
    this.maturityDate = "";
   }

  ngOnInit(): void {
    this.dbService.getCustomerLoans(this.userService.getCustomerId()).subscribe((response)=>{
      if(response.length != 0) {
        this.outstanding = response[0].amount;
        let matDate = response[0].requestDate;
        this.maturityDate = matDate.substring(8,10)+"-"+matDate.substring(5,7)+"-"+(parseInt(matDate.substring(0,4)) + 1).toString();
      }
      console.log("inside dashboard");
      console.log(response);
    });
    this.dbService.getBorrowerDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response) => {
      //console.log(response);
      let fullAccount = response[0].accountno;
      this.accountnumber = fullAccount.substring(fullAccount.length - 4);
      this.ifsccode = response[0].ifsccode.toUpperCase();
      //console.log(this.accountnumber);
    });
  }

  changeShowToOne(){
    this.show = 1;
  }

  changeShowToTwo(){
    this.show = 2;
  }
  loanScreen(){
    this.router.navigate(['/loanrequest']);
  }

}
