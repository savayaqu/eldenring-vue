import { makeRequest } from '@/api/makeRequest.js'
export const login = async (nickname, password) => {
    const response = await makeRequest(
        '/login',
        'POST',
        JSON.stringify({
            nickname,
            password
        })
    )
    return response.json()
}