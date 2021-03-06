import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-investmoney',
  templateUrl: './investmoney.component.html',
  styleUrls: ['./investmoney.component.css']
})
export class InvestmoneyComponent implements OnInit {
  public investMoney: FormGroup;
  public customerId: string;
  interest: any;
  public nextInterestDueDate: any;


  constructor(private dbService: DBService, private userService: UserService, public formBuilder: FormBuilder, private apiCallService: ApiCallService, private router: Router) {
    this.investMoney = formBuilder.group({
      amount: ['', Validators.required],
      frequency: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.dbService.getLenderDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response) => {
      console.log(response);
      this.customerId = response[0].customerId;
    });
  }

  insertInvestment() {
    var data = {};
    data["customerId"] = this.customerId;
    data["amount"] = this.investMoney.value.amount;
    data["frequency"] = this.investMoney.value.frequency;
    data["requestDate"] = new Date().toISOString().split("T")[0];
    data["description"] = "Investment";
    data["type"] = "debit";
    // this.interest = (data["amount"]) / 100.0;
    // this.nextInterestDueDate = new Date( Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    this.dbService.insertInvestment(data).subscribe((response) => {
      console.log(response);
      let transaction = {};
      transaction["customerId"] = this.customerId;
      transaction["date"] = new Date().toISOString().split("T")[0];
      transaction["amount"] = this.investMoney.value.amount;
      transaction["description"] = "Investment";
      transaction["type"] = "debit";
      this.dbService.insertTransaction(transaction).subscribe((reso) => {
        console.log(reso);
        //this.router.navigate(['/borrowerdashboard']);
        this.router.navigate(['/lenderdashboard']);
      });
      

    });

  }
}
