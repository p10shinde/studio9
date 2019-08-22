export interface Bill {
  billNo?: number;
  billDateTime?: Date;
  userID: string;
  userFullName: string;
  userContact: string;
  custID: string;
  custName: string;
  custContact: string;
  billTotal: number;
  billDiscountedTotal: number;
  paymentHistory: Array<{
    amount: number;
    mode: string;
    date?: Date;
    userID: string;
  }>;
  billDetails: Array<{
    descr: string,
    address: string,
    price: number,
    qty: number,
    tPrice: number
  }>;
  // aPaymentType: string;
  // pPaymentType: string;
  // advancePayment: number;
  pendingPayment: number;
  discount: {
    hasDiscount: boolean;
    discountAmount: number;
    type: string
  };
}
