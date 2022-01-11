const { EmptyResourceError } = require("./errors");

// module.exports = function normalize(schema) {
//     schema.set('toJSON', {
//         virtuals: true,
//         versionKey: false,
//         transform: function (doc, ret) {
//             delete ret._id
//         }
//     })
// }

module.exports = function isEmptyObject(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        throw new EmptyResourceError
    }
}