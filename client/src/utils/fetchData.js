import axios from 'axios';

export const baseUrl = 'https://localhost:8080';

export const fetchData = async (url) => {
    const { data } = await axios.get((url))
}