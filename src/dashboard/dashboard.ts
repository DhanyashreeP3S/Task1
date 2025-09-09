import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Expense } from '../expense/expense';
import { CommonModule, DatePipe } from '@angular/common';
import { ExpenseService } from '../expense/expense-service';
import { createGlobalPositionStrategy } from '@angular/cdk/overlay';


@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatButtonModule,
    CommonModule
  ],
  providers: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{

    name:string[]=['Dashboard','Add Expense','Total Transcation','Month Transcation']


totalExpenses:number =0;
today:Date=new Date() ;
monthDate:number=0;
totalMonth:number=0;
totalItem:number=0;
totalMonthTranscation:number=0;

constructor(private expenseService:ExpenseService,private datePipe: DatePipe){ 

    this.monthDate = Number(this.datePipe.transform(this.today, 'M' ));
   console.log( Number(this.datePipe.transform(this.today, 'M' )));
}





ngOnInit(): void {
  
  this.expenseService.getValue().subscribe((name)=>{ 
    let length=name.length;
    name.map((item)=>{
    this.totalExpenses+=(+item.account)
    const mondate=this.datePipe.transform(item.date, 'M' )||''
  if(Number(mondate )===this.monthDate){

  this.totalMonth+=Number(item.account )
  }

this.totalItem=length ;
if(Number(mondate )===this.monthDate){
  this.totalMonthTranscation++;
}

  
  })  
})





  console.log(this.totalExpenses)
}
   

}
