const SET_USER = "user/USER";
const CREATE_USER = "user/CREATEUSER";

const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const createUser = (user) => {
    return {
        type: CREATE_USER,
        user
    }
}

export const getUsers = () => async(dispatch) => {
    const response = await fetch('/api/users/');
    if 
}