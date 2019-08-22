import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Passport } from '../../Datastructures/Passport';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less']
})
export class PassportComponent implements OnInit {

  passportTemplates: Array<Passport> = [];
  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<PassportComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.passportTemplates = [
      {descr: '8 photos of size 3.5 x 4.5 cm', price: 20, address: '', ifUrgent: false, qty: 1, tPrice: 0},
      {descr: '10 photos of size 3.5 x 4.5 cm', price: 40, address: '', ifUrgent: false, qty: 1, tPrice: 0},
      {descr: '16 photos of size 3.5 x 4.5 cm', price: 60, address: '', ifUrgent: false, qty: 1, tPrice: 0},
      {descr: '42 photos of size 3.5 x 4.5 cm', price: 80, address: '', ifUrgent: false, qty: 1, tPrice: 0},
    ];
  }

  openLink(event: MouseEvent): void {
    this.dialogRef.close();
  }

  onNoClick(myForm): void {
    this.dialogRef.close();
  }

  urgentClick() {
    this.passportTemplates = this.passportTemplates.filter(el => el.price += el.price + 30);
  }


}
