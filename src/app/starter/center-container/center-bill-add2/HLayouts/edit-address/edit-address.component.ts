import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { OrderAddress } from '../../Datastructures/OrderAddress';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'underscore';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.less']
})


export class EditAddressComponent implements OnInit {

  // @ViewChild(myForm: FormControl);
  addressModel: OrderAddress = null;
  cities = ['Pune'];
  states = ['Maharashtra', 'Uttar Pradesh', 'Madhya Pradesh'];
  countries = ['India'];

  constructor(public dialogRef: MatDialogRef<EditAddressComponent>,  @Inject(MAT_DIALOG_DATA) public inputData: any) {
    this.addressModel = {
      street: 'streeeet 1',
      landmark: 'landmark 22',
      city: 'Pune',
      postalCode: 411033,
      state: 'Maharashtra',
      country: 'India',
    };
  }

  ngOnInit() {
    console.log(this.inputData);
    // const addressData = this.inputData.split(', ');
    if (!_.isEmpty(this.inputData)) {
      this.addressModel = this.inputData;
    }
    // {
    //   street: addressData[0],
    //   landmark: addressData[1],
    //   city: addressData[2],
    //   postalCode: addressData[3],
    //   state: addressData[4],
    //   country: addressData[5],
    // };
  }

  openLink(event: MouseEvent): void {
    this.dialogRef.close();
  }

  onNoClick(myForm): void {
    this.dialogRef.close();
  }

  okClick(addressForm: NgForm) {
    this.dialogRef.close(addressForm.value);
  }
}
