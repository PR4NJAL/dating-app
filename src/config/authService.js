import { API } from '../ENV/apiRoutes';

const authService = {
    async login(email, password) {
        const response = await fetch(API.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        return data;
    },

    async register(userData) {
        const response = await fetch(API.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if(!response.ok) {
            throw new Error('Registration failed');
        }

        return response.json()
    },

    async refreshToken() {
        const refresh_token = localStorage.getItem('refresh_token');
        const response = await fetch(API.REFRESH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refresh_token,
            }),
        });

        if(!response.ok) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return data;
    },

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
};

export default authService;