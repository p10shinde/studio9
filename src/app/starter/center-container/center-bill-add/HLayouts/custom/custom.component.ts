import { Custom } from '../../Datastructures/Custom';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.less']
})
export class CustomComponent implements OnInit {

  customTemplates: Array<Custom> = [];
  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<CustomComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.customTemplates = [
      {descr: '12x36 Photobook Album per page', address: '', price: 500, qty: 1, tPrice: 0},
      {descr: 'VideoShooting Half Day', address: '', price: 7500, qty: 1, tPrice: 0},
      {descr: 'VideoShooting full Day', address: '', price: 10000, qty: 1, tPrice: 0},
      {descr: 'Candid Photographer Half Day', address: '', price: 7000, qty: 1, tPrice: 0},
      {descr: 'Candid Photographer Full Day', address: '', price: 10000, qty: 1, tPrice: 0},
      {descr: 'Drone Shooting', address: '', price: 10000, qty: 1, tPrice: 0},
      {descr: 'LED Wall 8X12', address: '', price: 15000, qty: 1, tPrice: 0},
      {descr: 'LED Wall 10X16', address: '', price: 24000, qty: 1, tPrice: 0},
      {descr: 'LED Wall 10X20', address: '', price: 26000, qty: 1, tPrice: 0},
      {descr: '36 Ft Jimmy Jib Crane', address: '', price: 12000, qty: 1, tPrice: 0},
      {descr: 'HD Mixer-Video Editing Setup Online', address: '', price: 10000, qty: 1, tPrice: 0},
      {descr: 'Cinematography', address: '', price: 15000, qty: 1, tPrice: 0}
    ];
  }

  openLink(event: MouseEvent): void {
    this.dialogRef.close();
  }

  onNoClick(myForm): void {
    this.dialogRef.close();
  }

}
