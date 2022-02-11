export function pagination(page, limit, data) {
    isNaN(limit) ? limit = 10 : page
    isNaN(page) ? page = 0 : page

    const pages = Math.floor(data.length / limit)
    page > pages ? page = pages : page

    const skip = page * limit
    const limiting = skip + limit

    const result =  data.slice(skip, limiting)

    return {
        result,
        currentPage : page,
        pages
    }
}