import { Request, Response } from 'express';
import {
  sendSuccessResponse,
  sendValidationError,
  sendInternalServerError,
} from '../../helpers/response';
import User from '../../models/user';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!name || !password || !email) {
    return sendValidationError(res, 'Required fields missing');
  }

  const user = new User({
    email,
    name,
    password,
  });

  try {
    const userObj = await user.save();
    sendSuccessResponse(res, userObj);
  } catch (err) {
    sendInternalServerError(res);
  }
};
