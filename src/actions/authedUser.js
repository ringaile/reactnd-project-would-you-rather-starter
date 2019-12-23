export const LOG_OUT = "LOG_OUT"
export const SET_AUTHED_USER = "AUTHENTICATE_USER"

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}

export function LogOut(id) {
    return {
        type: LOG_OUT,
        id
    }
}