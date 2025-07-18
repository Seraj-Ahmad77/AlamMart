class ErrorHandler extends Error {
    constructor(message, statuscode) {
        super(message);
        this.statuscode = statuscode;
    }
}

export const errormiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server Error";
    err.statuscode = err.statuscode || 500;

    // Handle MongoDB Duplicate Key Error
    if (err.code === 11000) {
        err = new ErrorHandler("Duplicate field value entered", 400);
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        err = new ErrorHandler("JSON Web Token is invalid. Try again.", 400);
    }

    if (err.name === "TokenExpiredError") {
        err = new ErrorHandler("JSON Web Token has expired. Try again.", 400);
    }

    // MongoDB CastError (invalid _id, etc.)
    if (err.name === "CastError") {
        err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
    }

    const errorMessage = err.errors
        ? Object.values(err.errors).map((error) => error.message)
        : err.message;

    return res.status(err.statuscode).json({
        success: false,
        message: errorMessage
    });
};

export default ErrorHandler;
