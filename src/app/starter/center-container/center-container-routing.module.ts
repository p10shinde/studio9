import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenterReportComponent } from './center-report/center-report.component';
import { CenterBillListComponent } from './center-bill-list/center-bill-list.component';
import { CenterCustomerComponent } from './center-customer/center-customer.component';
import { CenterBillAdd2Component } from './center-bill-add2/center-bill-add2.component';
import { CenterUserComponent } from './center-user/center-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/report/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: CenterReportComponent },
  { path: 'list', component: CenterBillListComponent },
  { path: 'add', component: CenterBillAdd2Component },
  { path: 'manage', component: CenterCustomerComponent },
  { path: 'modify', component: CenterUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterContainerRoutingModule { }
