class RequestError extends Error {
    constructor(message, status) {
        super(message)

        this.name = this.constructor.name
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor)
        return {message, status}
    }
}

class ResourceNotFoundError extends RequestError {
    constructor(message, status) {
        super(message, status);
        this.message = "Resource not found"
        this.status = 404
    }
}

class EmptyResourceError extends RequestError {
    constructor(message, status) {
        super(message, status);
        this.message = "The request is empty"
        this.status = 400
    }
}

module.exports = { ResourceNotFoundError, EmptyResourceError }