import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterReportComponent } from './center-report/center-report.component';
import { CenterBillListComponent } from './center-bill-list/center-bill-list.component';
import { CenterBillAddComponent } from './center-bill-add/center-bill-add.component';
import { CenterCustomerComponent } from './center-customer/center-customer.component';


const routes: Routes = [
  { path: '', redirectTo: '/report/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CenterReportComponent },
  { path: 'list/:billNo', component: CenterBillListComponent },
  { path: 'add', component: CenterBillAddComponent },
  { path: 'manage', component: CenterCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterContainerRoutingModule { }
