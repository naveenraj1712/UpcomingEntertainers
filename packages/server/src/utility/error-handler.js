class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }

    statusCode() {
        return this.statusCode
    };
}

const notFound = (req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 304;
    next(error);
}

const handleError = (err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.send({
        error: err.message
    });
}

module.exports = { ErrorHandler, notFound, handleError }