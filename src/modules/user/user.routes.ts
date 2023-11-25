import express from 'express';
import { userController } from './user.controller';
const userRoutes = express.Router();

userRoutes.post('/', userController.createUserController);
userRoutes.get('/', userController.getAllUsersController);

export default userRoutes;
