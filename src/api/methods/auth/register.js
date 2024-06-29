import { makeRequest } from '@/api/makeRequest.js'
export const register = async (nickname, password) => {
    const response = await makeRequest(
        '/register',
        'POST',
        JSON.stringify({
            nickname,
            password,
        })
    )

    return response.json()
}