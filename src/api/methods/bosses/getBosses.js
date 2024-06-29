import { makeRequest } from "@/api/makeRequest.js";

export const getBosses = async () => {
    const response = await makeRequest('/bosses');
    return response.json();
}