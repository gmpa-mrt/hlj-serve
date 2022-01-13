import User from "../models/User.js";
import {isEmptyObject} from "../lib/normalizeJson.js";
import {ResourceNotFoundError, RequestError} from "../lib/errors.js";
import errorHandler from "../lib/errorHandler.js";

export default class UserController {
   static user_get_all = async (req, res) => {
        const users = await User.find({})
        return res.status(200).send(users)
    }

   static user_show = async (req, res) => {
        const user = await User.findOne({
            id: req.params.id
        })
        return res.status(200).send(user)
    }

   static user_create = async (req, res) => {
        try {
            await User.create(req.body)
        } catch (e) {
            return res.status(400).send(e.message)
        }
        return res.status(201).json({
            message: "User created"
        })
    }

   static user_update = async (req, res) => {
        const { name, email } = req.body
        try {
            isEmptyObject(req.body)
        } catch (e) {
            return res.status(e.status).send(e.message)
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
            errorHandler(e.name) ? e = new RequestError : e = new ResourceNotFoundError
            return res.status(e.status).send(e.message)
        }
    }

   static user_destroy = async (req, res) => {
        try {
            await User.remove({ _id: req.params.id })
            return res.status(200).send({ message: "The resource has been removed" })
        } catch (e) {
            e = new ResourceNotFoundError
            return res.status(e.status).send(e.message)
        }
    }
}