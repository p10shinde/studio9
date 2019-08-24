import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface Service {
  name: string;
  price: number;
}

@Component({
  selector: 'app-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.less']
})
export class DynamicDialogComponent implements OnInit {

  services: Array<Service> = [];
  title = '';
  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<DynamicDialogComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.title = data.package.name;
    this.services = data.package.list;
    // [
    //   {descr: '8 photos of size 3.5 x 4.5 cm', price: 20, address: '', ifUrgent: false, qty: 1, tPrice: 0},
    //   {descr: '10 photos of size 3.5 x 4.5 cm', price: 40, address: '', ifUrgent: false, qty: 1, tPrice: 0},
    //   {descr: '16 photos of size 3.5 x 4.5 cm', price: 60, address: '', ifUrgent: false, qty: 1, tPrice: 0},
    //   {descr: '42 photos of size 3.5 x 4.5 cm', price: 80, address: '', ifUrgent: false, qty: 1, tPrice: 0},
    // ];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  returnFunc(val, itemsForm) {
    console.log(val);
    this.dialogRef.close(!val ? null : this.services.filter( serv => serv.name === val)[0]);

  }
}
