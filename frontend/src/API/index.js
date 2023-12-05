import React from 'react';

const domain = "http://localhost:8000/";

export async function POSTRequest(endpoint, data) {
    const url = domain + endpoint;
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
    const url = domain + endpoint;
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
    const url = domain + endpoint;
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
    const url = domain + endpoint;
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return res
}