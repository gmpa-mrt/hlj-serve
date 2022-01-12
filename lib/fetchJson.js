import fetch from "node-fetch";
import {ErrorType} from "./errors.js";

export async function fetchJson(url, options) {
    const response = await fetch(`${process.env.API_URL}${url}`, options);
    if (!response.ok) {
        throw new ErrorType(url, response.status);
    }
    return await response.json();
}
