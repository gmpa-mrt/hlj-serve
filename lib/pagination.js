export function pagination(req, data) {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const skip = page * limit
    const limiting = skip + limit


   return  data.slice(skip, limiting)
}