import { Component, OnInit, Inject } from '@angular/core';
import { Wedding } from '../../Datastructures/Wedding';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.less']
})
export class WeddingComponent implements OnInit {

  weddingTemplates: Array<Wedding> = [];
  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<WeddingComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.weddingTemplates = [
      {descr: 'Only Soft Copies Traditional Photographer', address: '', price: 7000, qty: 1, tPrice: 0},
      {descr: 'Photobook Album 12×36 - Photo limit 150', address: '', price: 8000, qty: 1, tPrice: 0},
      {descr: 'Photobook Album 12×36 - Photo limit 280', address: '', price: 15000, qty: 1, tPrice: 0},
      {descr: 'Photobook Album 12×36 - Photo limit 280 + Video Shooting', address: '', price: 25000, qty: 1, tPrice: 0},
      {descr: 'Photobook Album 12×36 - Photo limit 280 + Video Shooting + Candid Photographer', address: '',
        price: 35000, qty: 1, tPrice: 0}
    ];
  }

  openLink(event: MouseEvent): void {
    this.dialogRef.close();
  }

  onNoClick(myForm): void {
    this.dialogRef.close();
  }

}
