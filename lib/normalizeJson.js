const { EmptyResourceError } = require("./errors");

function normalize(schema) {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id
        }
    })
}

function isEmptyObject(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        throw new EmptyResourceError
    }
}

module.exports = { normalize, isEmptyObject }