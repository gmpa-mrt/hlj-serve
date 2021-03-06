import {fetchJson} from "../lib/fetchJson.js";
import {pagination} from "../lib/pagination.js";

export default class ApiController {
    /* Default request to RapidApi */
    static searchEnglishToKanji = async (req, res) => {
        //@Todo see bad request in url
        try {
            const response = await fetchJson(`/search/${req.params.word}`, {
                headers: { 'x-rapidapi-key': process.env.API_KEY }
            })
            return res.status(200).json(response)
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

    static getKanji = async (req, res) => {
        try {
            const response = await fetchJson(`/kanji/${req.params.kanji}`, {
                headers: { 'x-rapidapi-key': process.env.API_KEY }
            })
            return res.status(200).json(response)
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

    static getAllKanji = async (req, res) => {
        const data = await fetchJson('/kanji/all', {
            headers: { 'x-rapidapi-key': process.env.API_KEY }
        })


        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const {result, currentPage, pages} = pagination(page, limit, data)

        try {
            return res.status(200).json({result, currentPage, pages})
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }

    /* Default request to RapidApi */
    static searchEnglishToKanjiDetails = async (req, res) => {
        try {
            const data = await fetchJson(`/search/${req.params.word}`, {
                headers: { 'x-rapidapi-key': process.env.API_KEY }
            })

            const kanji = data[0].kanji

            try {
                const response = await fetchJson(`/kanji/${kanji.character}`, {
                    headers: { 'x-rapidapi-key': process.env.API_KEY }
                })
                return res.status(200).json(response)
            } catch (e) {
                return res.status(400).json({
                    message: e.message
                })
            }
        } catch (e) {
            return res.status(400).json({
                message: e.message
            })
        }
    }
}
