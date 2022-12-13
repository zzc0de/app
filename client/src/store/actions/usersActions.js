import axios from "axios";
import ENV from "../../env.config";

import {
    GET_USER,
    GET_USERS,
    CREATE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    UPDATE_USER_PASSWORD,
} from "../types/typesUsers.js";


const getUsers = (users) => ({
    type: GET_USERS,
    payload: users,
    loading: true,
});

const getUser = (user) => ({
    type: GET_USER,
    payload: user,
});

const login = (user) => ({
    type: LOGIN_USER,
    payload: user,
});

const logout = () => ({
    type: LOGOUT_USER,
})

const addUser = () => ({
    type: CREATE_USER,
});

const userUpdatePassword = () => ({
    type: UPDATE_USER_PASSWORD,
});



export const createUser = (user, animationSignup, setError) => {
    return async function(dispatch) {
        try {
            await axios.post(`${ENV.HOSTNAME}api/registration`, user)
                .then((response) => {
                    dispatch(addUser(response.data));
                    console.log(response.data)
                    animationSignup();
                });
        } catch (error) {
            console.log(error);
            const messageRegistration = error.response.data.errors;
            messageRegistration.map((item) => {
            if (item.email) {
                setError("email", { type: "email", message: item.email });
            }
        });
            // dispatch(failLogin(messageEmail));
        }
    }
}

export const loginUser = (data, navigate, setError) => {
    return async function(dispatch) {
        try {
            await axios.post(`${ENV.HOSTNAME}api/login`, data)
                .then((response) => {
                    console.log("from user acti", response.data)
                    dispatch(login(response.data));
                    localStorage.setItem("token", JSON.stringify(response.data.accessToken));
                    navigate('/dashboard')
                });
        } catch (error) {
            console.log(error)
            const messageRegistration = error.response.data.errors;
            messageRegistration.map((item) => {
            if (item.email) {
                setError("email", { type: "email", message: item.email });
            } else if (item.password) {
                setError("password", { type: "password", message: item.password });
            }
            });
        }
    }
}

export const logoutUser = (navigate) => {
    return async function(dispatch) {
        try {
            await axios.post(`${ENV.HOSTNAME}api/logout`)
                .then((response) => {
                    localStorage.removeItem("token");
                    dispatch(logout());
                    navigate("/")

                })
        } catch (error) {
            console.log(error)
        }
    }
};

export const loadUser = (id) => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}user${id}`)
                .then((response) => {
                    dispatch(getUser(response.data));
                });
        } catch (error) {
            console.log(error)
        }
    }
}

export const loadUsers = () => {
    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}api/users`)
                .then((response) => {
                    dispatch(getUsers(response.data))
                });
        } catch (error) {
            console.log(error);
        }
    }
};

export const updateUserPassword = (user, id) => {
    return async function(dispatch) {
        try {
            await axios.put(`${ENV.HOSTNAME}user/${id}`, user)
                .then((response) => {
                    dispatch(userUpdatePassword(response.data));
                    dispatch(loadUsers())
                })
        } catch (error) {
            console.log(error);
        }
    }
}



export const compareAccessToken = () => {

    return async function(dispatch) {
        try {
            await axios.get(`${ENV.HOSTNAME}api/auth`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then((response) => {
                    console.log("data from compare token", response.data)
                    dispatch(login(response.data));
                })
        } catch (error) {
            console.log(error)
            localStorage.removeItem("token");
            dispatch(logout());
        }
    }
}