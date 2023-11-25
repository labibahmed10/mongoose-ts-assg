interface IFullName {
  firstName: string;
  lastName: string;
}

interface IUserAddress {
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

interface IUserOrders {
  productName: string;
  price: number;
  quantity: number;
}
