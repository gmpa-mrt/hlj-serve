import User from "../models/User.js";
import bcrypt from "bcrypt"
import {getUserFromJWT, generateJWT} from "../lib/JWT.js";
import {RequestError, ResourceNotFoundError} from "../lib/errors.js";
import {isEmptyObject, responseWithOutPassword} from "../lib/normalizeJson.js";
import errorHandler from "../lib/errorHandler.js";


export default class UserController {
    static user_get_all = async (req, res) => {
        const users = await User.find({})
        return res.status(200).json(users)
    }

    static user_show = async (req, res) => {
        const user = await User.findOne({
            id: req.params.id
        })
        return res.status(200).json(user)
    }

    static user_who_am_i = async (req, res) => {
        const id = getUserFromJWT(req)._id
        const user = await User.findOne({ id })
        return res.status(200).json(responseWithOutPassword(user))
    }

    static user_create = async (req, res) => {
        try {
            const { name, email, password } = req.body
            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                name,
                email,
                password: encryptedPassword
            })

            user.token = generateJWT(user)

            return res.status(201).json(responseWithOutPassword(user))
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

    static user_update = async (req, res) => {
        const { name, email } = req.body
        try {
            isEmptyObject(req.body)
        } catch (e) {
            return res.status(e.status).json({
                message: e.message
            })
        }
        try {
           const user = await User.findOneAndUpdate({ _id: req.params.id }, {
                name,
                email
            }, { returnDocument: 'after' })
            return res.status(200).json(responseWithOutPassword(user))
        } catch (e) {
            errorHandler(e.name) ? e = new RequestError : e = new ResourceNotFoundError
            return res.status(e.status).json({
                message: e.message
            })
        }
    }

    static user_destroy = async (req, res) => {
        try {
            await User.remove({ _id: req.params.id })
            return res.status(200).send({ message: "The resource has been removed" })
        } catch (e) {
            e = new ResourceNotFoundError
            return res.status(e.status).json({
                message: e.message
            })
        }
    }

    static user_add_kanji = async (req, res) => {
        try {
            const user = await User.findOneAndUpdate({ id: getUserFromJWT(req)._id }, {
                $addToSet: { kanji: req.params.kanji }
            }, { returnDocument: 'after' })
            return res.status(201).json(user)
        } catch (e) {
            res.status(400).json({
                message: e.message
            })
        }
    }

    static user_remove_one_kanji = async (req, res) => {
        try {
            const user = await User.findOneAndUpdate({ id: getUserFromJWT(req)._id }, {
                $pull: { kanji: req.params.kanji }
            }, { returnDocument: 'after' })
            return res.status(200).json(user)
        } catch (e) {
            res.status(400).json({
                message: e.message
            })
        }
    }

    static user_remove_all_kanji = async (req, res) => {
        try {
            const user = await User.findOneAndUpdate({ id: getUserFromJWT(req)._id }, {
                $set: { kanji: [] }
            }, { returnDocument: 'after' })
            return res.status(200).json(user)
        } catch (e) {
            res.status(400).json({
                message: e.message
            })
        }
    }
}