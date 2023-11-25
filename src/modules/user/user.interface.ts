import { Model } from 'mongoose';

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

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<IUser | null>;
}
