import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-quantity',
  templateUrl: './edit-quantity.component.html',
  styleUrls: ['./edit-quantity.component.less']
})
export class EditQuantityComponent implements OnInit {

  quantity = 1;

  constructor(
      public dialogRef: MatDialogRef<EditQuantityComponent>,
      @Inject(MAT_DIALOG_DATA) public inputData: any
  ) { }

  ngOnInit() {
    this.quantity = this.inputData.quantity;
  }

  openLink(event: MouseEvent): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  okClick(quantityForm: NgForm) {
    this.dialogRef.close(quantityForm.value);
  }

  onEnter(event: KeyboardEvent, quantityForm: NgForm) {
    if (event.key === 'Enter' && quantityForm.valid) {
      this.okClick(quantityForm);
    }
  }

}
