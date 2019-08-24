import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CenterContainerRoutingModule } from './center-container-routing.module';
import { CenterBillListComponent } from './center-bill-list/center-bill-list.component';
import { MatTableModule, MatCheckboxModule, MatBottomSheetModule, MatListModule, MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
        MatInputModule,
        MatTooltipModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatExpansionModule} from '@angular/material';
import { CenterReportComponent } from './center-report/center-report.component';
import { CenterBillAddComponent } from './center-bill-add/center-bill-add.component';
import { FormsModule } from '@angular/forms';
import { PassportComponent } from './center-bill-add2/HLayouts/passport/passport.component';
import { PreweddingComponent } from './center-bill-add/HLayouts/prewedding/prewedding.component';
import { WeddingComponent } from './center-bill-add/HLayouts/wedding/wedding.component';
import { BirthdayComponent } from './center-bill-add/HLayouts/birthday/birthday.component';
import { CustomComponent } from './center-bill-add/HLayouts/custom/custom.component';
import { EditAddressComponent } from './center-bill-add2/HLayouts/edit-address/edit-address.component';
import { DetailsActiveRowDirective } from './center-bill-list/details-active-row.directive';
import { CenterCustomerComponent } from './center-customer/center-customer.component';
import { EditQuantityComponent } from './center-bill-add2/HLayouts/edit-quantity/edit-quantity.component';
import { CenterBillAdd2Component } from './center-bill-add2/center-bill-add2.component';
import { DynamicDialogComponent } from './center-bill-add2/HLayouts/dynamic-dialog/dynamic-dialog.component';
import { AddressTransformPipe } from '../pipes/address-transform.pipe';
import { CenterUserComponent } from './center-user/center-user.component';


@NgModule({
  declarations: [CenterBillListComponent, CenterReportComponent, CenterBillAddComponent,
                  PassportComponent, PreweddingComponent, WeddingComponent, BirthdayComponent,
                  CustomComponent, EditAddressComponent, DetailsActiveRowDirective,
                  CenterCustomerComponent,
                  EditQuantityComponent,
                  CenterBillAdd2Component,
                  DynamicDialogComponent,
                  AddressTransformPipe,
                  CenterUserComponent
                ],
  imports: [
    CommonModule,
    CenterContainerRoutingModule,
    MatTableModule,
    FormsModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  entryComponents: [
    PassportComponent,
    PreweddingComponent,
    WeddingComponent,
    BirthdayComponent,
    CustomComponent,
    EditAddressComponent,
    EditQuantityComponent,
    CenterBillAdd2Component,
    DynamicDialogComponent,
    CenterUserComponent
  ],
  exports: [ CenterBillListComponent ]
})
export class CenterContainerModule { }
