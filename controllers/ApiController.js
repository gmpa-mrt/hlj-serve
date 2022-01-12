import {fetchJson} from "../lib/fetchJson.js";

export default class ApiController {
    static searchEnglishToKanji = async (req, res) => {
        //@Todo see bad request in url
        try {
            const response = await fetchJson(`/search/${req.params.word}`, {
                headers:{'x-rapidapi-key': process.env.API_KEY}
            })
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send(e.message)
        }
    }

    static searchKanji = async (req, res) => {
        try {
            const response = await fetchJson(`/kanji/${req.params.kanji}`, {
                headers:{'x-rapidapi-key': process.env.API_KEY}
            })
            return res.status(200).send(response)
        } catch (e) {
            return res.status(400).send(e.message)
        }
    }

}
