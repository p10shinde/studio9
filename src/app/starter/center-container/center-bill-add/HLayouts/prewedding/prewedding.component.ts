import { Component, OnInit, Inject } from '@angular/core';
import { Prewedding } from '../../Datastructures/Prewedding';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prewedding',
  templateUrl: './prewedding.component.html',
  styleUrls: ['./prewedding.component.less']
})
export class PreweddingComponent implements OnInit {

  preweddingTemplates: Array<Prewedding> = [];
  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<PreweddingComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    this.preweddingTemplates = [
      {descr: 'Photos Soft Copy', address: '', price: 12000, qty: 1, tPrice: 0},
      {descr: 'Photos Soft Copy + Photo Book Album', address: '', price: 15000, qty: 1, tPrice: 0},
      {descr: 'Video + Photo(2 days setup, Crane 2, Drone, Slider, 2-Camera Setup, Lights)', address: '', price: 45000, qty: 1, tPrice: 0},
      {descr: 'Video + Photo(1 day setup, Crane 2, Drone, Slider, 2-Camera Setup, Lights)', address: '', price: 35000, qty: 1, tPrice: 0}
    ];
  }

  openLink(event: MouseEvent): void {
    this.dialogRef.close();
  }

  onNoClick(myForm): void {
    this.dialogRef.close();
  }

}
