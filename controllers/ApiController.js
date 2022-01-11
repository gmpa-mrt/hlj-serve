import fetch from "node-fetch";

export default class ApiController {
    static searchEnglishToKanji = async (req, res) => {
        const data = await fetch(`https://kanjialive-api.p.rapidapi.com/api/public/search/${req.params.word}`)
        return res.status(200).send(data)
    }
}
