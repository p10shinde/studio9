import { Component, OnInit, NgZone, QueryList, ViewChildren, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CartItems } from './Datastructures/CartItems';
import { isUndefined } from 'util';
import { UserService } from '../../Services/user.service';
import { CustomerService } from '../../Services/customer.service';
import { CustomsnackbarService } from '../../Services/customsnackbar.service';
import { BillService } from '../../Services/bill.service';
import { EditAddressComponent } from './HLayouts/edit-address/edit-address.component';
import { Bill } from './Datastructures/bill';
import { isEmpty } from 'rxjs/operators';
import { EditQuantityComponent } from './HLayouts/edit-quantity/edit-quantity.component';
import { OfferingService } from '../../Services/offering.service';
import { DynamicDialogComponent } from './HLayouts/dynamic-dialog/dynamic-dialog.component';
import * as _ from 'underscore';




@Component({
  selector: 'app-center-bill-add2',
  templateUrl: './center-bill-add2.component.html',
  styleUrls: ['./center-bill-add2.component.less']
})
export class CenterBillAdd2Component implements OnInit {

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
  itemListAll = [];
  itemListTotal = 0;
  totalQuantity = 0;
  checkoutItems = [];



  constructor(private dialog: MatDialog,
              private qntyDialog: MatDialog,
              private dynamicDialog: MatDialog,
              private userService: UserService,
              private router: Router,
              private customerService: CustomerService,
              private snackbarService: CustomsnackbarService,
              private billService: BillService,
              private zone: NgZone,
              private offeringService: OfferingService
              ) { }

  ngOnInit() {
    this.loggedin = this.userService.checkLoggedIn();
    this.userID = sessionStorage.getItem('userID');
    this.userFullName = sessionStorage.getItem('userFullName');
    this.userContact = sessionStorage.getItem('userContact');
    if (!this.loggedin) {
      this.router.navigate(['/login']);
    } else {

      this.userService.validateUserSubscription().subscribe(resp => {
        this.loggedin = resp;
      });

      this.customerService.getCustomerNameList().subscribe(list => {
        this.customerNameList = list;
      });

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

  }

  resetBill(discountCheckBox: NgModel, advancepaycheck: NgModel, customerSelect: NgModel) {
    this.itemListAll = [];
    this.itemListTotal = this.discountAmount = this.billDiscountedTotal =
    this.advancePayAmount = this.pendingAmount = 0;

    this.billNo = null;
    this.custID = null;
    this.custName = null;
    this.custContact = null;
    discountCheckBox.control.setValue(false);
    advancepaycheck.control.setValue(false);
    customerSelect.control.setValue(false);
  }

  removeItemFromList(listname: string, total: string, item,
                     checkbox): void {

      // this[listname] = this[listname].filter(el => el.descr !== item.descr);
      // this[total] -= Number(item.price);
      // this.cartItems.filter(el => el.name !== item.name);
      // this.cartItems = [...this.passportItemList, ...this.preWeddingItemList, ...this.weddingItemList,
      //   ...this.birthdayItemList, ...this.customItemList];


      // NEED
      // this.cartItemsTotal -= Number(item.price);
      // if (this.discountType === 'rupee') {
      //   this.billDiscountedTotal = Number(this.cartItemsTotal - this.discountAmount);
      // } else {
      //   this.billDiscountedTotal = Number(this.cartItemsTotal - (this.cartItemsTotal * (this.discountAmount / 100)));
      // }
      // this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;

      // if (this.cartItems.length === 0) {
      //   this.advancePayAmount = this.discountAmount = this.billDiscountedTotal = 0;
      //   this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
      // }

  }

  // updateAmount(listTotal, obj, qty, modificationType) {
  //   this[listTotal] -= Number(obj.qty * obj.price);
  //   this.cartItemsTotal -= Number(obj.qty * obj.price);
  //   if (modificationType === 'add') {
  //     obj.qty = qty + 1;
  //   } else if (modificationType === 'minus') {
  //     obj.qty = qty - 1;
  //   } else {
  //     obj.qty = qty;
  //   }
  //   obj.tPrice = obj.qty * obj.price;
  //   this[listTotal] += Number(obj.tPrice);
  //   this.cartItemsTotal += Number(obj.tPrice);
  //   this.cartItems = [...this.passportItemList, ...this.preWeddingItemList, ...this.weddingItemList,
  //     ...this.birthdayItemList, ...this.customItemList];
  //   if (this.discountType === 'rupee') {
  //     this.billDiscountedTotal = Number(this.cartItemsTotal - this.discountAmount);
  //   } else {
  //     this.billDiscountedTotal = Number(this.cartItemsTotal - (this.cartItemsTotal * (this.discountAmount / 100)));
  //   }
  //   this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
  // }

  // NEED
  // showSubcontainer(listname: string, total: string, ifChecked: boolean) {
  //   if (!ifChecked) {
  //     this[listname] = []; this[total] = 0;
  //   }

  //   this.cartItems = [...this.passportItemList, ...this.preWeddingItemList, ...this.weddingItemList,
  //                     ...this.birthdayItemList, ...this.customItemList];
  //   this.cartItemsTotal = this.passportTotal + this.preweddingTotal + this.weddingTotal +
  //                         this.birthdayTotal + this.customTotal;
  //   return this[listname].length > 0 && ifChecked ? true : false;
  // }

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
      if (this.checkoutItems.length > 0) {
        if (this.advancePayAmount > this.billDiscountedTotal) {
          this.displaycustomError('Advance payment can not be greater than total amount');
          return false;
        }

        if (this.advancePayAmount < 0 || this.discountAmount < 0) {
          this.displaycustomError('Please enter amount greater than 0');
          return false;
        }


        this.advancePayAmount = Number(this.advancePayAmount);
        const billTotal = this.itemListTotal;
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
        const billDetails = this.checkoutItems;
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

  // fires when discount amount changed
  addDiscount(discountAmountModel: NgModel) {
    // this.cartItemsTotal = 15;
    if (this.discountAmount <= (this.itemListTotal - this.advancePayAmount)) {
      if (!discountAmountModel.control.errors && this.itemListTotal > 0) {
        if (this.discountType === 'rupee') {
          this.billDiscountedTotal = +this.itemListTotal - +this.discountAmount;
        } else {
          this.billDiscountedTotal = +this.itemListTotal - (this.itemListTotal * (this.discountAmount / 100));
        }
        this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
      }
    } else {
      this.discountAmount = 0;
      this.displaycustomError('Discount can not be greater than total');
    }
  }

  onDiscountTypeChange(discountType) {
    this.discountType = discountType;
    this.discountAmount = 0;
    this.billDiscountedTotal = +this.itemListTotal;
  }


  takeAdvancePay(advancePayModel: NgModel) {
    if (this.advancePayAmount > this.billDiscountedTotal) {
      this.displaycustomError('Amount can not be greater than pending amount');
      this.advancePayAmount = 0;
      return false;
    }
    if (!advancePayModel.control.errors && this.itemListTotal > 0) {

      // this.billDiscountedTotal =
      if (this.discountType === 'rupee') {
        this.billDiscountedTotal = +this.itemListTotal - +this.discountAmount;
      } else {
        this.billDiscountedTotal = +this.itemListTotal - (this.itemListTotal * (this.discountAmount / 100));
      }
      this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;

    }
  }

  // set discount to zero when user clicks on checkbox
  discountCheckClicked() {
    this.discountAmount = 0;
    this.discountType = 'rupee';
    this.billDiscountedTotal = this.itemListTotal;
    this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
  }

  advancePaymentCheckClicked() {
    this.advancePayAmount = 0;
    this.billDiscountedTotal = this.itemListTotal - this.discountAmount;
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

// New Implementation
  packageCheckboxClick(pckg) {
    this.itemListAll = this.itemListAll.filter(itm =>
      Object.keys(itm)[0] !== pckg.orderID
    );

    this.checkoutItems = this.checkoutItems.filter(itm => {
      if (itm.orderID.search(pckg.orderID) > -1) {
        this.itemListTotal -= itm.tPrice;

        //update discount
        if (this.discountType === 'rupee') {
          this.billDiscountedTotal = +this.itemListTotal - this.discountAmount;
        } else {
          this.billDiscountedTotal = +this.itemListTotal - (this.itemListTotal * (this.discountAmount / 100));
        }

        this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
      }
      return itm.orderID.search(pckg.orderID)  === -1;
    }
    );


  }
  openServicesDialog(pckgObject) {
    // console.log(pckgObject);
    const dialogRef = this.dynamicDialog.open(DynamicDialogComponent, {
      panelClass: 'panelClass',
      data: { package : pckgObject }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(result);

        // add item to the itemListAll
        const obj = {};
        const key = result.orderID.split('_srv')[0];
        obj[key] = [];
        obj[key].push({...result, qty : 1, address : {}});
        const existingList  = this.itemListAll.filter(itm => itm[key]);
        if (existingList.length === 0) {
          this.itemListAll.push(obj);
        } else {
          existingList[0][key].push({...result, qty : 1, address : {}});
        }
        // update checkoutList
        this.checkoutItems.push(this.makeItemForCheckout({...obj[key][0]}));
        this.totalQuantity = _.pluck(this.checkoutItems, 'qty').reduce((a, b) => a + b, 0);

        // update itemsListTotal
        this.itemListTotal += result.price;

        //update discount
        if (this.discountType === 'rupee') {
          this.billDiscountedTotal = +this.itemListTotal - this.discountAmount;
        } else {
          this.billDiscountedTotal = +this.itemListTotal - (this.itemListTotal * (this.discountAmount / 100));
        }

        this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
      }
    });
  }

  makeItemForCheckout(data) {
    return {
      qty: data.qty,
      descr: data.name,
      price: data.price,
      address: data.address,
      tPrice: data.price * data.qty,
      orderType: data.orderType,
      orderID: data.orderID
    };
  }

  // when user removes from itemListAll
  removeService(findID, removeID) {
    const curIdList = this.itemListAll.filter(res =>
        _.keys(res)[0] === findID
    );
    const finalList = curIdList[0][findID].filter(rt => {
        if (rt.orderID === removeID) {
          this.itemListTotal -= (rt.qty * rt.price);
          this.billDiscountedTotal -= (rt.qty * rt.price);
          // update discount
          if (this.discountType === 'rupee') {
            this.billDiscountedTotal = +this.itemListTotal - this.discountAmount;
          } else {
            this.billDiscountedTotal = +this.itemListTotal - (this.itemListTotal * (this.discountAmount / 100));
          }
          this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
        }
        return rt.orderID !== removeID;
      }
    );
    curIdList[0][findID] = finalList;
    // update checkoutList
    this.checkoutItems = this.checkoutItems.filter(res => res.orderID !== removeID);
    this.totalQuantity = _.pluck(this.checkoutItems, 'qty').reduce((a, b) => a + b, 0);
  }

  // when user adds quantity to itemList
  addQuantity(findID, refID, servQuantity) {
    let curtQty = +servQuantity.value;
    curtQty < 0 ? curtQty = 1 : curtQty = curtQty;
    if (curtQty >= 1) {
      const curIdList = this.itemListAll.filter(res =>
        _.keys(res)[0] === findID
      );
      curIdList[0][findID].map(rt => {
          if (rt.orderID === refID) {
            rt.qty += 1;
            this.itemListTotal += rt.price;
            // update checkoutList
            const refdata = _.findWhere(this.checkoutItems, {orderID : refID});
            refdata.qty = rt.qty;
            refdata.tPrice = rt.price * rt.qty;
            this.totalQuantity = _.pluck(this.checkoutItems, 'qty').reduce((a, b) => a + b, 0);

            // update discount
            if (this.discountType === 'rupee') {
              this.billDiscountedTotal = +this.itemListTotal - this.discountAmount;
            } else {
              this.billDiscountedTotal = +this.itemListTotal - (this.itemListTotal * (this.discountAmount / 100));
            }
            this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
          }
        }
      );
    }
  }
  // when user decreases quantity to itemList
  removeQuantity(findID, removeID, servQuantity) {
    let curtQty = +servQuantity.value;
    curtQty <= 0 ? curtQty = 1 : curtQty = curtQty;
    if (curtQty > 1) {
      const curIdList = this.itemListAll.filter(res =>
          _.keys(res)[0] === findID
      );
      curIdList[0][findID].map(rt => {
          if (rt.orderID === removeID) {
            rt.qty -= 1;
            this.itemListTotal -= rt.price;
            // update checkoutList
            const refdata = _.findWhere(this.checkoutItems, {orderID : removeID});
            refdata.qty = rt.qty;
            refdata.tPrice = rt.price * rt.qty;
            this.totalQuantity = _.pluck(this.checkoutItems, 'qty').reduce((a, b) => a + b, 0);

            // update discount
            if (this.discountType === 'rupee') {
              this.billDiscountedTotal = +this.itemListTotal - this.discountAmount;
            } else {
              this.billDiscountedTotal = +this.itemListTotal - (this.itemListTotal * (this.discountAmount / 100));
            }
            this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;
          }
        }
      );
    }
  }

  // when user enters quantity value directly for itemList from dialog
  updateQuantity(findID, refID, servQuantity) {
    let curtQty = servQuantity;
    curtQty <= 0 ? curtQty = 1 : curtQty = curtQty;
    if (curtQty > 1) {
      const curIdList = this.itemListAll.filter(res =>
          _.keys(res)[0] === findID
      );
      curIdList[0][findID].map(rt => {
          if (rt.orderID === refID) {
            this.itemListTotal -= rt.qty * rt.price;
            rt.qty = curtQty;
            // update checkoutList
            const refdata = _.findWhere(this.checkoutItems, {orderID : refID});
            refdata.qty = rt.qty;
            refdata.tPrice = rt.price * rt.qty;
            this.totalQuantity = _.pluck(this.checkoutItems, 'qty').reduce((a, b) => a + b, 0);

            this.itemListTotal += refdata.tPrice;
            // update discount
            if (this.discountType === 'rupee') {
              this.billDiscountedTotal = +this.itemListTotal - this.discountAmount;
            } else {
              this.billDiscountedTotal = +this.itemListTotal - (this.itemListTotal * (this.discountAmount / 100));
            }
            this.pendingAmount = this.billDiscountedTotal - this.advancePayAmount;

          }
        }
      );
    }
  }

  openQtyInput(findID, refID, servQuantity) {
    const dialogRef = this.qntyDialog.open(EditQuantityComponent, {
      panelClass: 'panelClass',
      data: { quantity : +servQuantity.value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateQuantity(findID, refID, result.quantity);
      }
    });
  }

  insertAddress(findID, refID, refAddress) {
    const editAddressDialog = this.dialog.open(EditAddressComponent, {
      width: '600px',
      data: {...refAddress}
    });

    editAddressDialog.afterClosed().subscribe(addressForm => {
      if (addressForm) {
        console.log(addressForm);
        const curIdList = this.itemListAll.filter(res =>
            _.keys(res)[0] === findID
        );
        curIdList[0][findID].map(rt => {
            if (rt.orderID === refID) {
              rt.address = addressForm;
              // update checkoutList
              const refdata = _.findWhere(this.checkoutItems, {orderID : refID});
              refdata.address = {...rt.address};
              this.totalQuantity = _.pluck(this.checkoutItems, 'qty').reduce((a, b) => a + b, 0);
            }
          }
        );
      }
    });
  }

}
