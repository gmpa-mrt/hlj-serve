import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import errorHandler from "../lib/errorHandler.js";
import {RequestError, ResourceNotFoundError} from "../lib/errors.js";
import generateJWT from "../lib/generateJWT.js";
import {isEmptyObject} from "../lib/normalizeJson.js";
import User from "../models/User.js";

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

            return res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                token: user.token
            })
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
            await User.updateOne({ _id: req.params.id }, {
                name,
                email
            })
            return res.status(200).json({
                id: req.params.id,
                name,
                email
            })
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
}