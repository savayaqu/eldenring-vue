import { makeRequest } from '@/api/makeRequest.js'
export const addeditFight = async (bossId, status, attempts) => {
    const response = await makeRequest(
        `/boss/${bossId}`,
        'POST',
        JSON.stringify({
            status: status,
            attempts: attempts
        })
    )
    return response.json()
}