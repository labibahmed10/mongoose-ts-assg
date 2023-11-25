import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IFullName, IUser, IUserAddress, IUserOrders } from './user.interface';
import config from '../../utils/config';

const fullNameSchema = new Schema<IFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<IUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const ordersSchema = new Schema<IUserOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, unique: true, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: {
    type: [ordersSchema],
    default: [],
  },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';

  next();
});

export const userModel = model<IUser>('user', userSchema);
