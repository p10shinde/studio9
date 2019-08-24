export interface User {
  userTitle?: string;
  userFullName: string;
  type: string;
  userEmail: string;
  password?: string;
  userID: string;
  passwordT?: string;
  userContact: string;
  userAddress?: {
    street: string;
    landmark: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
}
