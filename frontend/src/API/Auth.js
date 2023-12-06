import API from ".";

export async function AuthRequest(endpoint, data) {
    const url = API.getDomain() + endpoint;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return res
}