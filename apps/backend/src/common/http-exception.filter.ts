import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
  path: string;
  timestamp: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = "Unexpected error";
    let error = "Internal Server Error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();

      if (typeof body === "object" && body !== null) {
        const parsed = body as Partial<ErrorResponse>;
        message = parsed.message ?? message;
        error = parsed.error ?? "Request Error";
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    res.status(status).json({
      statusCode: status,
      message,
      error,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
