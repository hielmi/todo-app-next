import {
  addData,
  deleteData,
  retriveData,
  updateData,
} from "@/lib/firebase/services";
import {
  responseError,
  ResponseSuccessWithData,
} from "@/utils/responseTemplate";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const todos = await retriveData("todos");
    ResponseSuccessWithData(res, todos, "success get todos", 200);
  } else if (req.method === "POST") {
    const todo = req.body;
    await addData("todos", todo, (status: boolean, result: any) => {
      if (status) {
        ResponseSuccessWithData(
          res,
          {
            id: result.id,
            ...todo,
          },
          "success add todo",
          201
        );
      } else {
        responseError(res, "failed add todo");
      }
    });
  } else if (req.method === "PUT") {
    const { id }: any = req.query;
    const todo = req.body;
    await updateData("todos", id, todo, (status: boolean, result: any) => {
      if (status) {
        ResponseSuccessWithData(res, result, "success update todo", 200);
      } else {
        responseError(res, "failed update todo");
      }
    });
  } else if (req.method === "DELETE") {
    const { id }: any = req.query;
    if (id) {
      await deleteData("todos", id, (status: boolean, result: any) => {
        if (status) {
          ResponseSuccessWithData(res, result, "success delete todo", 200);
        } else {
          responseError(res, "failed delete todo");
        }
      });
    } else {
      responseError(res, "failed delete todo");
    }
  } else {
    responseError(res, "method not allowed");
  }
}
