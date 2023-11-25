/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userZodValidation } from './user.zod.validation';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const validatedResult = userZodValidation.parse(data);
    const result = await userService.createUserInDB(validatedResult);

    // delete withoutPass.password;
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User creation failed',
      error: {
        code: 404,
        description: error?.issue ? error?.issues[0].message : error?.message,
      },
    });
  }
};

export const userController = {
  createUser,
};
