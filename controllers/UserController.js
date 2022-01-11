const User = require('../schemas/User')
const isEmptyObject = require("../lib/normalizeJson");
const { ResourceNotFoundError } = require("../lib/errors");

exports.user_get_all = async (req, res) => {
    const users = await User.find({})
    return res.status(200).send(users)
}

exports.user_show = async (req, res) => {
    const user = await User.findOne({
        id: req.params.id
    })
    return res.status(200).send(user)
}

exports.user_create = async (req, res) => {
    try {
        await User.create(req.body)
    } catch (err) {
        return res.status(400).send(err.message)
    }
    return res.status(201).json({
        message: "User created"
    })
}

exports.user_update = async (req, res) => {
    const { name, email } = req.body
    try {
        isEmptyObject(req.body)
    } catch (e) {
       return  res.status(e.status).send(e.message)
    }
    try {
        await User.updateOne({ _id: req.params.id }, {
            name,
            email
        })
        return res.status(200).send({
            id: req.params.id,
            name,
            email
        })
    } catch (e) {
        e = new ResourceNotFoundError
        return res.status(e.status).send(e.message)
    }
}