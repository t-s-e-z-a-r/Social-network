import { store } from './slice';
class ApiService {
    constructor(store) {
        this.store = store;
    }

    getAuthToken() {
    const state = this.store.getState();
    return state.auth.token;
    }

    getDomain() {
        const domain = "http://localhost:8000/";
        return domain;
    }

    async POST(endpoint, data) {
        const url = this.getDomain() + endpoint;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return res;
    }

    async GET(endpoint) {
        const url = this.getDomain() + endpoint;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAuthToken()}`,
            },
        });

        return res;
    }

    async PUT(endpoint, data) {
        const url = this.getDomain() + endpoint;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return res;
    }

    async DELETE(endpoint, data) {
        const url = this.getDomain() + endpoint;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return res;
    }
}

export default new ApiService(store);
