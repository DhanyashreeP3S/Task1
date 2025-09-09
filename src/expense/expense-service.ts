import { createGlobalPositionStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Expense {
  account: number;
  category: string;
  date:Date,
  payment:string,
  description:string,
  notes:string
}

@Injectable({
  providedIn: 'root'
})


export class ExpenseService {

     private details=new BehaviorSubject<Expense[]>([])
     newValue=this.details.asObservable();

     

  outputDetails(account:number, category: string, date:Date,payment:string,description:string,notes:string){
    const newExpense: Expense = {
      account: account,
      category: category,
      date:date,
      payment:payment,
      description:description,
      notes:notes
    }
    // console.log(this.details.getValue())
    let data=this.details.getValue();
    // console.log(data);
    data.push(newExpense);
    // let value=[...data,newExpense]
    this.details.next(data)
    this.localStorage(data)

  }

  localStorage(item:Expense[]){
    localStorage.setItem('ItemDetails',JSON.stringify(item))
  }

  

  initialize() {
    const data = localStorage.getItem('ItemDetails');
    if (data) {
      this.details.next(JSON.parse(data));
    }
  }
  
  
  getValue(){
    return this.details.asObservable();
  }
}
