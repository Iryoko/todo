type Data = Record<string, string | number>;

export class GeneralError extends Error {
  statusCode: number;
  data?: Data;
  constructor(statusCode: number, message: string, data?: Data) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class AuthenticationError extends GeneralError {
  constructor(data: Data) {
    super(401, "Authentication Error", data);
  }
}

export class UnauthorizedError extends GeneralError {
  constructor() {
    super(401, "Unauthorized Error");
  }
}
