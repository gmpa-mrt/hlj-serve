export default function errorHandler(errorName) {
    return errorName === 'MongoServerError'
}