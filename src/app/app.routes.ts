import { Routes } from '@angular/router';
import { Dashboard } from '../dashboard/dashboard';
import { Expense } from '../expense/expense';
import { History } from '../history/history';

export const routes: Routes = [
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
    {path:'dashboard',component:Dashboard},
    {path:'expense',component:Expense},
    {path:'history',component:History}
];
