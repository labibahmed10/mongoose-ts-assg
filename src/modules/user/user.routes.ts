import express from 'express';
import { userController } from './user.controller';
const userRoutes = express.Router();

userRoutes.post('/', userController.createUserController);
userRoutes.get('/', userController.getAllUsersController);
userRoutes.get('/:userId', userController.getSingleUserController);
userRoutes.put('/:userId', userController.updateSingleUserController);

export default userRoutes;
