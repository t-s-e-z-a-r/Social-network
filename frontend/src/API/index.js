export const getDomain = () =>{
    const domain = "http://localhost:8000/";
    return domain
}
    

export async function POSTRequest(endpoint, data) {
    const url = getDomain() + endpoint;
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return res
}

export async function GETRequest(endpoint, data) {
    const url = getDomain() + endpoint;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return res
}

export async function PUTRequest(endpoint, data) {
    const url = getDomain() + endpoint;
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return res
}

export async function DELETERequest(endpoint, data) {
    const url = getDomain() + endpoint;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return res
}