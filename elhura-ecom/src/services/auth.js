import axios from "axios";

require('dotenv').config();

export const isUserAuthenticated = async () => {
    const response = await axios({
            method: 'POST',
            url: '/api/auth/check-auth'
        });
    console.log(response)
    return response.data.auth;
}

export const canPassToNextRegisterSteps = async () => {
    const response = await axios({
        method: 'POST',
        url: '/api/auth/can-pass-to-next-register-steps'
    });
    console.log(response.data);
    return response.data.flag;
}

export const canMakeRegisterChoice = async () => {
    const response = await axios({
        method: 'POST',
        url: '/api/auth/can-make-register-choice'
    });
    return response.data.flag;
}

export const canConfirmRegister = async () => {
    const response = await axios({
        method: 'POST',
        url: '/api/auth/can-confirm-register'
    });
    console.log("CAN CONFIRM : "+response.data.flag)
    return response.data.flag;
}

export const validateRegister = async (otpPassword) => {
    const response = await axios({
        method: 'POST',
        url: '/api/auth/validate',
        data: {
            code: otpPassword
        }
    });
    return response.data.auth;
}

export const login = async (email, password) => {
    console.log("HELLO BEFORE")
    const response = await axios({
        method: 'POST',
        url: '/api/auth/login',
        data: {
            email: email,
            password: password,
        }
    });
    return response.data.auth
}

export const logout = async () => {
    const response = await axios({
        method: 'POST',
        url: '/api/auth/logout'
    });
    return response.data.logout
}