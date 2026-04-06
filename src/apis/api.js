import axios from 'axios';
const URL = process.env.REACT_APP_BASE_URL;

console.log(URL)
export async function reviewCodeAPI(code) {
    const response = await axios.post(`${URL}/ai/get-review`, { code })
    return response.data;
}


