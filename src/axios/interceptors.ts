import axios from 'axios';

axios.interceptors.request.use(
	(config) => {
		config.withCredentials = true;

		const isAuth = config.url?.includes(`/auth`);
		if (!isAuth) {
			axios.get(`/auth/token`);
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);
