import axios from "axios";

export const upload = async (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    const response =  await axios.post('/api/files/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        },
        onUploadProgress
    );

    console.log("RESPONSE : "+response)
    return response
}

export const getFiles = async() => {
    return await axios({
        method: 'GET',
        url: '/api/files'
    });
}