import {EmptyResourceError} from "./errors.js";

export function normalize(schema) {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id
        }
    })
}

export function isEmptyObject(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        throw new EmptyResourceError
    }
}
