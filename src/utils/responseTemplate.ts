import { NextApiResponse } from "next";

const generateResponse = (
  res: NextApiResponse,
  statusCode: number,
  status: boolean,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    status,
    message,
    data: data || {},
  });
};

export const ResponseSuccessWithData = (
  res: NextApiResponse,
  data: any[],
  message: string,
  statusCode: number
) => {
  return generateResponse(res, statusCode, true, message, data);
};

export const responseAccessDenied = (res: NextApiResponse) => {
  return generateResponse(res, 403, false, "Access Denied");
};

export const responseError = (res: NextApiResponse, message: string) => {
  return generateResponse(res, 500, false, message);
};
