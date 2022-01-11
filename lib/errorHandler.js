function errorHandler(errorName) {
    return errorName === 'MongoServerError'
}
module.exports = errorHandler