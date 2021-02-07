import axios from "axios";

require('dotenv').config();

export const isUserAuthenticated = async () => {
    const response = await axios({
            method: 'POST',
            url: '/api/auth/check-auth'
        });
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

export const login = async (email) => {
    const response = await axios({
        method: 'POST',
        url: '/api/auth/login',
        body: {
            email: email
        }
    });
    return response.data.flag
}