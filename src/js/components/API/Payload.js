import { fetchData } from './Fetch';

export const getPayload = async (url) => {
    try {
        const payload = await fetchData(url);
        console.log(payload);
        return payload;

    } catch(error) { 
        return error;
    }
}