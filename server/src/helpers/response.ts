import { Response } from 'express';
import { RESPONSE_SUCCESS, ERROR_VALIDATION, ERROR_INTERNAL_SERVER_ERROR } from './responseCodes';

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

export const sendInternalServerError = (res: Response) => {
  res.status(400).json({
    code: ERROR_INTERNAL_SERVER_ERROR
  });
};
