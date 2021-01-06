import axios from 'axios';
import { IUser } from './types';

const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/v1/'
});

export const checkIfLoggedIn = (callback: (isLoggedIn: boolean) => void): void => {
	if (!api.defaults.headers.common['Authorization']) {
		callback(false);
	}
	api
		.get('/auth/user/')
		.then((res) => {
			callback(res.data.username);
		})
		.catch((_) => {
			callback(false);
		});
};

export const getCurrentUser = (callback: (user?: IUser) => void): void => {
	if (!api.defaults.headers.common['Authorization']) {
		callback();
	}
	api
		.get('/auth/user/')
		.then((res) => {
			callback({
				id: res.data.id,
				username: res.data.username,
				email: res.data.email
			});
		})
		.catch((_) => {
			callback();
		});
};

export const setHeaders = () => {
	let token = localStorage.getItem('authToken');
	if (token) {
		console.log('headers set!');
		api.defaults.headers.common['Authorization'] = `Token ${token}`;
	} else {
		delete api.defaults.headers.common['Authorization'];
	}
};

export default api;
