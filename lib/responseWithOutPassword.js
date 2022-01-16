export default function responseWithOutPassword(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: user.token
    }
}