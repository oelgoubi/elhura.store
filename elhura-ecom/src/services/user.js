import axios from "axios";

require('dotenv').config();

export const fetchUserRole = async () => {
    const response = await axios({
            method: 'POST',
            url: '/api/user/role'
        });
    return response.data.userRole;
}