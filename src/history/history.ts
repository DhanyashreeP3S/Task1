import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ExpenseService, Expense } from '../expense/expense-service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSort, Sort, MatSortModule, MatSortable} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


export interface PeriodicElement {
  date: Date;
  account: string;
  category: string;
  payment: string;
  description: string,
  notes: string

}

const ELEMENT_DATA: Expense[] = []

@Component({
  selector: 'app-history',
  providers: [provideNativeDateAdapter(),DatePipe,MatSortModule],
  imports: [MatTableModule,MatSortModule, MatFormFieldModule, FormsModule, MatInputModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, DatePipe, ReactiveFormsModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History implements OnInit,AfterViewInit {


    @ViewChild(MatSort) sort?: MatSort;

    

  formData!: FormGroup;
  displayedColumns: string[] = ['date', 'account', 'category', 'payment', 'description', 'notes'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  
    item:Expense[]=[]
  constructor(private route: Router, private expenseService: ExpenseService,private dataPipe:DatePipe) {

  }

  ngOnInit(): void {

    this.formData = new FormGroup({
      category: new FormControl(),
      formdate: new FormControl()
    })

    this.dataSource.data = []
    this.item =[]
 
     this.expenseService.getValue().subscribe( name => {
      this.item = name;
      this.dataSource.data = name;
      
    })

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.description.toLowerCase().includes(filter) ||
        data.notes.toLowerCase().includes(filter) ||
        data.category.toLowerCase() === filter.toLowerCase()
    };

    console.log(this.dataSource)
  }



   ngAfterViewInit() {
    this.sort?.sort(({ id: 'date', start: 'desc'}) as MatSortable)
    this.dataSource.sort = this.sort;
    this.sort?.sortChange.subscribe(data => {
      console.log(data);
    })
  }
  private _liveAnnouncer = inject(LiveAnnouncer);


   announceSortChange(sortState: Sort) { 
     if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


   
  navigate() {
    this.route.navigate(['/expense'])
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  applyCategoryFilter(selectedCategory: string) {
    if (selectedCategory) {
      this.dataSource.filter = selectedCategory.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }


  dataFilter() {
    const formdate = this.formData.get('formdate')?.value || null;
  const previousDate=this.dataPipe.transform(formdate,'M/d/yyyy');
    this.dataSource.data = this.dataSource.data.filter((item)=>{
   let itemDate=this.dataPipe.transform(item.date,'M/d/yyyy');


   if(previousDate === itemDate){
       
    return true;

   }

   return false;
    })

    

  }





}