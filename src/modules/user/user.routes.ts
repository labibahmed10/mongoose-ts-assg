import express from 'express';
import { userController } from './user.controller';
const userRoutes = express.Router();

// user related routes
userRoutes.post('/', userController.createUserController);
userRoutes.get('/', userController.getAllUsersController);
userRoutes.get('/:userId', userController.getSingleUserController);
userRoutes.put('/:userId', userController.updateSingleUserController);
userRoutes.delete('/:userId', userController.deleteSingleUserController);

// user orders routes
userRoutes.put('/:userId/orders', userController.putOrderForUserController);
userRoutes.get('/:userId/orders', userController.getAllOrdersForSpecificUser);
userRoutes.get('/:userId/orders/total-price', userController.userOrdersTotalPriceController);

export default userRoutes;
