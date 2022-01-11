const User = require('../schemas/User')

exports.user_get_all = async (req, res) => {
    const users = await User.find({})
    return res.status(200).send(users)
}

exports.user_create = async (req, res) => {
    try {
        await User.create(req.body)
    } catch (err) {
        return res.status(400).send(err.message)
    }

    return res.status(200).json({
        message: "User created"
    })
}

exports.user_update = (req, res) => {

    console.log(req.params)

    return res.status(200).json({message:'Ok'})
}