import { Response } from 'express';
import { RESPONSE_SUCCESS, ERROR_VALIDATION } from './responseCodes';

export const sendSuccessResponse = (res: Response, data: any) => {
  res.json({
    code: RESPONSE_SUCCESS,
    data,
  });
};

export const sendValidationError = (res: Response, data: any) => {
  res.status(400).json({
    code: ERROR_VALIDATION,
    data,
  });
};
