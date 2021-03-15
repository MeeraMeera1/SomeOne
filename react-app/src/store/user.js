const SET_USER = "user/USER";
const CREATE_USER = "user/CREATEUSER";

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}