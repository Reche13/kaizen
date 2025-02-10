import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodIssue } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { success, error, data } = schema.safeParse(req.body);
    if (!success) {
      const errors = error.issues.map((issue: ZodIssue) => ({
        field: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      }));

      res.status(400).json({
        success,
        errors,
      });
      return;
    }
    req.body = data;
    next();
  };
};
