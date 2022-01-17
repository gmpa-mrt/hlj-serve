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


export function responseWithOutPassword(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        kanji: user.kanji,
        token: user.token
    }
}