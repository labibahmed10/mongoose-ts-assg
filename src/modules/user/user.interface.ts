export interface IFullName {
  firstName: string;
  lastName: string;
}

export interface IUserAddress {
  street: string;
  city: string;
  country: string;
}

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: IUserAddress;
  orders?: Array<IUserOrders>;
}

export interface IUserOrders {
  productName: string;
  price: number;
  quantity: number;
}
