import { Component, OnInit, NgZone, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PassportComponent } from './HLayouts/passport/passport.component';
import {MatDialog} from '@angular/material/dialog';
import { CartItems } from './Datastructures/CartItems';
import { isUndefined } from 'util';
import { Passport } from './Datastructures/Passport';
import { Wedding } from './Datastructures/Wedding';
import { PreweddingComponent } from './HLayouts/prewedding/prewedding.component';
import { Prewedding } from './Datastructures/Prewedding';
import { WeddingComponent } from './HLayouts/wedding/wedding.component';
import { BirthdayComponent } from './HLayouts/birthday/birthday.component';
import { Birthday } from './Datastructures/Birthday';
import { CustomComponent } from './HLayouts/custom/custom.component';
import { Custom } from './Datastructures/Custom';
import { UserService } from '../../Services/user.service';
import { CustomerService } from '../../Services/customer.service';
import { CustomsnackbarService } from '../../Services/customsnackbar.service';
import { BillService } from '../../Services/bill.service';
import { EditAddressComponent } from './HLayouts/edit-address/edit-address.component';
import { Bill } from './Datastructures/bill';
import { isEmpty } from 'rxjs/operators';
import { EditQuantityComponent } from './HLayouts/edit-quantity/edit-quantity.component';
import { OfferingService } from '../../Services/offering.service';


@Component({
  selector: 'app-center-bill-add2',
  templateUrl: './center-bill-add2.component.html',
  styleUrls: ['./center-bill-add2.component.less']
})
export class CenterBillAdd2Component implements OnInit {

  quantityElOldVal = 1;
  @ViewChildren('itemQuantity') components: QueryList<ElementRef>;
  cartItems: Array<CartItems>;
  cartItemsTotal = 0;

  passportTotal = 0;
  passportItemList: Array<Passport> = [];

  preweddingTotal = 0;
  preWeddingItemList: Array<Prewedding> = [];

  weddingTotal = 0;
  weddingItemList: Array<Wedding> = [];

  birthdayTotal = 0;
  birthdayItemList: Array<Birthday> = [];

  customTotal = 0;
  customItemList: Array<Custom> = [];
  checked = false;

  // userFullName: string;
  loggedin = false;
  custID = null;
  custName = null;
  userFullName = null;
  dateTime = new Date();
  userID: string = null;
  userContact: string = null;
  custContact: string = null;
  billNo: number = null;
  discountAmount = 0;
  billDiscountedTotal = 0;
  discountType = 'rupee';
  advancePayAmount = 0;
  pendingAmount = 0;
  paymentType = 'paytm';
  customerNameList: string[] = null;
  customError = {
    hasError: false,
    error: ''
  };
  // billData: Bill = {
  //   billNo: null,
  //   billDateTime: new Date(),
  //   userID: null,
  //   custID: null,
  //   billTotal: this.cartItemsTotal,
  //   billDiscountedTotal: 0,
  //   billDetails: [{
  //     descr: string,
  //     address: string,
  //     price: number
  //   }],
  //   discount: {
  //     hasDiscount: false,
  //     amount: number,
  //     type: string
  //   };
  // };

  offerings = [];
  itemList = [];


  constructor(private dialog: MatDialog,
              private qntyDialog: MatDialog,
              private userService: UserService,
              private router: Router,
              private customerService: CustomerService,
              private snackbarService: CustomsnackbarService,
              private billService: BillService,
              private zone: NgZone,
              private offeringService: OfferingService
              ) { }

  ngOnInit() {
    // this.cartItems.passport = this.cartItems.prewedding =
    // this.cartItems.wedding = this.cartItems.birthday = this.cartItems.custom = [];
    this.loggedin = this.userService.checkLoggedIn();
    this.userID = sessionStorage.getItem('userID');
    this.userFullName = sessionStorage.getItem('userFullName');
    this.userContact = sessionStorage.getItem('userContact');
    if (!this.loggedin) {
      this.router.navigate(['/login']);
    }
    this.userService.validateUserSubscription().subscribe(resp => {
      this.loggedin = resp;
    });

    this.customerService.getCustomerNameList().subscribe(list => {
      this.customerNameList = list;
    });
    // this.userFullName = sessionStorage.getItem('userFullName');
    // this.passportItemList.forEach((item, index) => {
    //   this.passportTotal += item.amount;
    // });

    // this.customItemList.forEach((item, index) => {
    //   this.customTotal += item.amount;
    // });

    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.dateTime = new Date();
      }, 1000);
    });

    this.offeringService.getAllOfferings().subscribe(offerings => {
      console.log(offerings);
      this.offerings = offerings;
    },
    err => {
      console.log('Got error' + err);
      if (err.status === 404) {
        this.snackbarService.open('No offering found');
      } else if (err.status === 422) {
        this.snackbarService.open(err.error);
      } else {
        this.snackbarService.open(err.message);
      }
    },
    () => {
      console.log('Completed successfully');
    });

  }

  resetBill(discountCheckBox: NgModel, advancepaycheck: NgModel, customerSelect: NgModel) {
    this.passportItemList = [];
    this.preWeddingItemList = [];
    this.weddingItemList = [];
    this.birthdayItemList = [];

    this.customItemList = [];
    this.cartItems = [];
    this.passportTotal = this.preweddingTotal = this.weddingTotal = this.birthdayTotal =
    this.customTotal = this.cartItemsTotal = this.discountAmount = this.billDiscountedTotal =
    this.advancePayAmount = this.pendingAmount = 0;

    this.billNo = null;
    this.custID = null;
    this.custName = null;
    // this.userContact = null;
    this.custContact = null;
    // this.userFullName = null;
    // for (const control in itemsForm.controls) {
    //   if (itemsForm.controls[control].value === true) {
    //     itemsForm.controls[control].setValue(false);
    //   }
    // }
    discountCheckBox.control.setValue(false);
    advancepaycheck.control.setValue(false);
    customerSelect.control.setValue(false);

  }

  removeItemFromList(listname: string, total: string, item: Passport | Prewedding | Wedding | Birthday | Custom,
                     checkbox): void {

      this[listname] = this[listname].filter(el => el.descr !== item.descr);
      this[total] -= Number(item.price);
      // this.cartItems.filter(el => el.name !== item.name);
      this.cartItems = [...this.passportItemList, ...this.preWeddingItemList, ...this.weddingItemList,
        ...this.birthdayItemList, ...this.customItemList];
      this.cartItemsTotal -= Number(item.price);
      if (this.discountType === 'rupee') {
        this.billDiscountedTotal = Number(this.cartItemsTotal - this.discountAmount);
      } else {
        this.billDiscountedTotal = Number(this.cartItemsTotal - (this.cartItemsTotal * (this.discountAmount / 100)));
      }
      this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;

      if (this.cartItems.length === 0) {
        // itemsForm.controls[checkbox.name].setValue(false);
        this.advancePayAmount = this.discountAmount = this.billDiscountedTotal = 0;
        this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;

      }

  }

  getQunatity(listName: string, refItem: any,  qtyInput: NgModel, listTotal: string) {
    const dialogRef = this.qntyDialog.open(EditQuantityComponent, {
      panelClass: 'panelClass',
      data: { quantity : +qtyInput.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateAmount(listTotal, refItem, result.quantity, 'update');
      }
    });
  }

  openDialog(componentName: string, listname: string, total: string): void {
    let cmpName = null;
    switch (componentName) {
      case 'PassportComponent':
        cmpName = PassportComponent;
        break;
      case 'PreweddingComponent':
        cmpName = PreweddingComponent;
        break;
      case 'WeddingComponent':
        cmpName = WeddingComponent;
        break;
      case 'BirthdayComponent':
        cmpName = BirthdayComponent;
        break;
      case 'CustomComponent':
        cmpName = CustomComponent;
        break;
      default:
        break;
    }

    if (cmpName != null) {
      const dialogRef = this.dialog.open(cmpName, {
        panelClass: 'panelClass'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          const descr  = result.split('|')[0].trim();
          const price = Number(result.split('|')[1].trim());
          const tPrice = price;
          const address = '';
          const ifUrgent = false;
          const qty = 1;
          !isUndefined(result) ? this[listname].push({descr, price, address, ifUrgent, qty, tPrice}) : this[listname].push();
          // !isUndefined(result) ? this.cartItems.push({name, price}) : this.cartItems.push();
          this[total] += Number(price);
          this.cartItems = [...this.passportItemList, ...this.preWeddingItemList, ...this.weddingItemList,
            ...this.birthdayItemList, ...this.customItemList];
          this.cartItemsTotal += Number(price);
          if (this.discountType === 'rupee') {
            this.billDiscountedTotal = Number(this.cartItemsTotal - this.discountAmount);
          } else {
            this.billDiscountedTotal = Number(this.cartItemsTotal - (this.cartItemsTotal * (this.discountAmount / 100)));
          }

          this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
          console.log(this.billDiscountedTotal);
        }
      });
    } else {
      alert('No component Found');
      console.log('No component Found');
    }

  }

  itemQPButton(listName: string, refItem: any, qtyInput: NgModel, listTotal: string) {
    let qty = +qtyInput.value;
    qty < 0 ? qty = 1 : qty = qty;
    if (qty >= 1) {
      this[listName].map(obj => {
        if (obj.descr === refItem.descr) {
          this.updateAmount(listTotal, obj, qty, 'add');
        }
      });
    }

  }

  itemQMButton(listName: string, refItem: any,  qtyInput: NgModel, listTotal: string) {
    let qty = +qtyInput.value;
    qty <= 0 ? qty = 1 : qty = qty;
    if (qty > 1) {
      this[listName].map(obj => {
        if (obj.descr === refItem.descr) {
          this.updateAmount(listTotal, obj, qty, 'minus');
        }
      });
    }
  }

  updateAmount(listTotal, obj, qty, modificationType) {
    this[listTotal] -= Number(obj.qty * obj.price);
    this.cartItemsTotal -= Number(obj.qty * obj.price);
    if (modificationType === 'add') {
      obj.qty = qty + 1;
    } else if (modificationType === 'minus') {
      obj.qty = qty - 1;
    } else {
      obj.qty = qty;
    }
    obj.tPrice = obj.qty * obj.price;
    this[listTotal] += Number(obj.tPrice);
    this.cartItemsTotal += Number(obj.tPrice);
    this.cartItems = [...this.passportItemList, ...this.preWeddingItemList, ...this.weddingItemList,
      ...this.birthdayItemList, ...this.customItemList];
    if (this.discountType === 'rupee') {
      this.billDiscountedTotal = Number(this.cartItemsTotal - this.discountAmount);
    } else {
      this.billDiscountedTotal = Number(this.cartItemsTotal - (this.cartItemsTotal * (this.discountAmount / 100)));
    }
    this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
  }

  showSubcontainer(listname: string, total: string, ifChecked: boolean) {
    if (!ifChecked) {
      this[listname] = []; this[total] = 0;
    }

    this.cartItems = [...this.passportItemList, ...this.preWeddingItemList, ...this.weddingItemList,
                      ...this.birthdayItemList, ...this.customItemList];
    this.cartItemsTotal = this.passportTotal + this.preweddingTotal + this.weddingTotal +
                          this.birthdayTotal + this.customTotal;
    return this[listname].length > 0 && ifChecked ? true : false;
  }

  // activateUrgent(item: Passport) {
  //   console.log('activated');
  //   if (!item.ifUrgent) {
  //     item.price = Number(item.price) + 50;
  //     this.passportTotal += Number(50);
  //   } else {
  //     item.price = Number(item.price) - 50;
  //     this.passportTotal -= Number(50);
  //   }
  //   item.ifUrgent = !item.ifUrgent;
  // }

  selectCustomer(customerName: string) {
    this.customerService.searchCustomer(customerName.match(/(?<=\().+?(?=\))/)[0]).subscribe(customer => {
      this.custID = customer[0].custID;
      this.custContact = customer[0].custContact;
      this.custName = customer[0].custName;
      this.snackbarService.open(`Customer ${this.custID} found`, 'success');
    },
    err => {
      this.custID = null;
      this.custContact = null;
      this.custName = null;
      console.log('Got error' + err);
      if (err.status === 404) {
        this.snackbarService.open('No customer found');
      } else if (err.status === 422) {
        this.snackbarService.open(err.error);
      } else {
        this.snackbarService.open(err.message);
      }
    },
    () => {
      // this.snackbarService.open('Completed successfully', 'success');
      console.log('Completed successfully');
    });
  }

  printBillFinal() {
    this.billService.printBill(this.billNo).
    subscribe(result => {
      this.snackbarService.open(`Bill : ${result.billNo} printed successfully`, 'success');
    },
    err => {
      if (err.status === 404) {
        this.snackbarService.open('No bills generated yet.');
      } else {
        if (err.error && err.error) {
          this.snackbarService.open(err.error.exception);
        } else {
          this.snackbarService.open(err.message);
        }
      }
    },
    () => {
      console.log('Completed successfully');
    });
  }

  saveBill() {

    if (this.custID) {
      if (this.cartItems.length > 0) {
        if (this.advancePayAmount > this.billDiscountedTotal) {
          this.displaycustomError('Advance payment can not be greater than total amount');
          return false;
        }

        if (this.advancePayAmount < 0 || this.discountAmount < 0) {
          this.displaycustomError('Please enter amount greater than 0');
          return false;
        }


        this.advancePayAmount = Number(this.advancePayAmount);
        const billTotal = this.cartItemsTotal;
        // const advancePayment = this.advancePayAmount;
        const pendingPayment = this.pendingAmount;
        // const pPaymentType = null;
        // let aPaymentType;
        let paymentHistory = [];
        if (this.advancePayAmount > 0 ) {
          paymentHistory = [{
            amount: this.advancePayAmount,
            mode: this.paymentType,
            userID: this.userID
          }];
          // aPaymentType = this.paymentType;
        }
        const billDetails = this.cartItems;
        const userID = this.userID;
        const custID = this.custID;
        const custContact = this.custContact;
        const userContact = this.userContact;
        const custName = this.custName;
        const userFullName = this.userFullName;
        const discount = {
          hasDiscount: this.discountAmount > 0 ? true :  false,
          discountAmount: +this.discountAmount,
          type: this.discountType,
          // date: new Date()
        };
        const billDiscountedTotal = +this.billDiscountedTotal;
        if (!this.billNo) {
          this.billService.saveBill({userID, custID, userContact, billTotal, pendingPayment,
                                    billDetails, billDiscountedTotal, paymentHistory,
                                    discount, custName, custContact, userFullName })
          .subscribe(respBillDetails => {
            this.billNo = respBillDetails.billNo;
            this.snackbarService.open(`Bill : ${this.billNo} saved successfully`, 'success');
          },
          err => {
            this.billNo = null;
            console.log(err);
            if (err.status === 404) {
              this.snackbarService.open('Unable to save bill details');
            } else if (err.status === 422) {
              this.snackbarService.open(err.error);
            } else {
              this.snackbarService.open(err.message);
            }
          },
          () => {
            console.log('Completed successfully');
          });
        } else {
          this.modifyBill({userID, custID, userContact, billTotal, pendingPayment,
                            billDetails, billDiscountedTotal, paymentHistory,
                            discount, custName, custContact, userFullName });
        }
      } else {
        this.snackbarService.open('No items added to the cart.');
      }
    } else {
      this.snackbarService.open('Please choose customer.');
    }
  }

  modifyBill(data: Bill) {
    const billNo = this.billNo;
    data = { ...data, billNo };
    this.billService.modifyBill(data).subscribe(() => {
      this.snackbarService.open(`Bill : ${this.billNo} Updated successfully`, 'success');
    },
    err => {
      console.log(err);
      if (err.status === 404) {
        this.snackbarService.open('Unable to save bill details. Please save again.');
      } else if (err.status === 422) {
        this.snackbarService.open(err.error);
      } else {
        this.snackbarService.open(err.message);
      }
    },
    () => {
      console.log('Completed successfully');
    });
  }

  addAddress(listname: string, item: Passport | Prewedding | Wedding | Birthday | Custom): void {
    if (EditAddressComponent != null) {
      const editAddressDialog = this.dialog.open(EditAddressComponent, {
        width: '600px',
        data: item.address
      });

      editAddressDialog.afterClosed().subscribe(addressForm => {
        if (addressForm) {
          const values = Object.keys(addressForm).map(key => addressForm[key]);
          const address = values.join(', ');
          this[listname].map(obj => {
            if (obj.descr === item.descr) {
              obj.address = address;
            }
          });
        }
      });
    } else {
      alert('No component Found');
      console.log('No component Found');
    }
  }

  addDiscount(discountAmountModel: NgModel) {
    // this.cartItemsTotal = 15;
    if (!discountAmountModel.control.errors && this.cartItemsTotal > 0) {
      if (this.discountType === 'rupee') {
        this.billDiscountedTotal = Number(this.cartItemsTotal - Number(this.discountAmount));
      } else {
        this.billDiscountedTotal = Number(this.cartItemsTotal - (this.cartItemsTotal * (this.discountAmount / 100)));
      }
      this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
    }
  }

  onDiscountTypeChange(discountType) {
    this.discountType = discountType;
    this.discountAmount = 0;
    this.billDiscountedTotal = Number(this.cartItemsTotal);
  }


  takeAdvancePay(advancePayModel: NgModel) {
    if (!advancePayModel.control.errors && this.cartItemsTotal > 0) {
      this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
      // this.billDiscountedTotal =
      // if (this.discountType === 'rupee') {
      //   this.billDiscountedTotal = Number(this.cartItemsTotal - Number(this.discountAmount));
      // } else {
      //   this.billDiscountedTotal = Number(this.cartItemsTotal - (this.cartItemsTotal * (this.discountAmount / 100)));
      // }
    }
  }

  //set discount to zero
  discountCheckClicked() {
    this.discountAmount = 0;
    this.billDiscountedTotal = this.cartItemsTotal;
    this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
    this.discountType = 'rupee';
  }

  advancePaymentCheckClicked() {
    this.advancePayAmount = 0;
    this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
  }


  displaycustomError(error) {
    this.customError = {
      hasError: true,
      error
    };

    setTimeout(() => {
      this.customError = {
        hasError: false,
        error: ''
      };
    }, 3000);
  }


  openServicesDialog(pckgObject) {
    console.log(pckgObject);
  }

}
