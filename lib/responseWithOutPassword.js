export default function responseWithOutPassword(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        kanji: user.kanji,
        token: user.token
    }
}