import { Component, OnInit, Inject } from '@angular/core';
import { Birthday } from '../../Datastructures/Birthday';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.less']
})
export class BirthdayComponent implements OnInit {

  birthdayTemplates: Array<Birthday> = [];
  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<BirthdayComponent>,  @Inject(MAT_DIALOG_DATA) public inputData: any) {
    this.birthdayTemplates = [
      {descr: 'Simple Album 4×6 - Photo limit 30', address: '', price: 1000, qty: 1, tPrice: 0},
      {descr: 'Simple Album 4×6 - Photo limit 80', address: '', price: 2500, qty: 1, tPrice: 0},
      {descr: 'Photobook Album 12×30 - Photo limit 150', address: '', price: 7500, qty: 1, tPrice: 0},
      {descr: 'Photobook Album 12×30 - Photo limit 150 + Video Shooting', address: '', price: 14000, qty: 1, tPrice: 0}
    ];
  }

  openLink(event: MouseEvent): void {
    this.dialogRef.close();
  }

  onNoClick(myForm): void {
    this.dialogRef.close();
  }

}

