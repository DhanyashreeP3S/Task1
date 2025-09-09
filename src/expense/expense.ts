import {MatSelectModule} from '@angular/material/select';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { ExpenseService } from './expense-service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-expense',
  imports: [FormsModule,MatSelectModule,MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatDatepickerModule,MatInputModule, ReactiveFormsModule],
  templateUrl: './expense.html',
  providers: [provideNativeDateAdapter(),DatePipe],
   changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './expense.css',
})


export class Expense implements OnInit {
  

   
  form= new FormGroup({
    numberFormControl: new FormControl( 0, [Validators.required]),
    date:new FormControl(new Date(),[Validators.required]),
    selectCategory:new FormControl('',[Validators.required]),
    payment:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.minLength(3),Validators.required]),
    notes:new FormControl('',[Validators.minLength(5)])
    })   
    
    todayDate = '';

    constructor(private dataExpense:ExpenseService,private dataPipe:DatePipe){
    }
    
    

    ngOnInit(): void {
      this.todayDate = this.dataPipe.transform(new Date(),'d/M/yyyy') || '';
  // this.form.get('date')?.setValue()

    }


    onReset(){
      // console.log('reset')
      this.form.patchValue({numberFormControl:0,selectCategory:'', date:new Date(),payment:'',description:'',notes:''})
    }
  onsubmit(){
    let account=this.form.getRawValue().numberFormControl;
    let category=this.form.getRawValue().selectCategory
    let payment=this.form.getRawValue().payment;
    let date=this.form.getRawValue().date
    let description=this.form.getRawValue().description
    let notes=this.form.getRawValue().notes
    this.dataExpense.outputDetails(account || 0, category||'',date || new Date(),payment||'',description||'',notes||'');
//this.form.get('numberFormControl')?.setValue(0);
    this.onReset();
   
  }
}