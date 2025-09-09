import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ExpenseService } from '../expense/expense-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatTabsModule,RouterLink,MatIconModule, MatTableModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Assignment');

  constructor(private expenseService: ExpenseService) {

  }

  ngOnInit(): void {
    this.expenseService.initialize();
  }

}



