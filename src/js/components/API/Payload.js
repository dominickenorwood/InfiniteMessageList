import { fetchData } from './Fetch';

export const getPayload = async (url) => {
    try {
        const payload = await fetchData(url);
        return payload;

    } catch(error) { 
        return error;
    }
}