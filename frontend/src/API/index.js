import { store } from './slice';
import { logout } from './slice';
import { errorHandler } from './slice';

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
                'Authorization': `Bearer ${this.getAuthToken()}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok){
            this.store.dispatch(errorHandler({
                code: res.status,
                text: res.statusText,
            }));
            if (res.status === 401) {
                this.store.dispatch(logout());
            }
        }
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
        console.log("RESPONSE",res)
        if (!res.ok){
            this.store.dispatch(errorHandler({
                code: res.status,
                text: res.statusText,
            }));
            if (res.status === 401) {
                this.store.dispatch(logout());
            }
        }
        return res;
    }

    async PUT(endpoint, data) {
        const url = this.getDomain() + endpoint;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAuthToken()}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok){
            this.store.dispatch(errorHandler({
                code: res.status,
                text: res.statusText,
            }));
            if (res.status === 401) {
                this.store.dispatch(logout());
            }
        }
        return res;
    }

    async DELETE(endpoint, data) {
        const url = this.getDomain() + endpoint;
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getAuthToken()}`,
            },
            body: JSON.stringify(data),
        });
        if (!res.ok){
            this.store.dispatch(errorHandler({
                code: res.status,
                text: res.statusText,
            }));
            if (res.status === 401) {
                this.store.dispatch(logout());
            }
        }
        return res;
    }
}

export default new ApiService(store);

