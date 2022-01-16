export default function checkValidEmail(email) {
    const emailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    return String(email).match(emailFormat)
}
