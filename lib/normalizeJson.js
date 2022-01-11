function normalize(schema) {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id
        }
    })
}

module.exports = normalize