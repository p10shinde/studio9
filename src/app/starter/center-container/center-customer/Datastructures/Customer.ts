export interface Customer {
  custTitle: string;
  custName: string;
  custEmail: string;
  custID: string;
  custContact: string;
  custAddress: {
    street: string;
    landmark: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
}
