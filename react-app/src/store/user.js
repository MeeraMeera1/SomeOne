const SET_USER = "user/USER";
const SET_USERS = "user/USERS"


const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const getUser = () => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    if (response.ok) {
        const user = await response.json()
        dispatch(setUser(user))
        return user;
    }
}

export const getUsers = () => async (dispatch) => {
    const response = await fetch("api/users");
    if (response.ok) {
        const users = await response.json()
        dispatch(setUsers(users))
        return users;
    }
}


export const getUsers 