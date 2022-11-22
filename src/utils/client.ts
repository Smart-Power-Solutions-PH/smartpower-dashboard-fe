import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setupInterceptors() {
  client.interceptors.request.use(function (config) {
    // const token = localStorage.getItem('token');
    // if (token) {
    // 	config?.headers?.Authorization = `Bearer ${token}`;
    // }

    return config;
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      //   const e = { ...error };
      //   console.log('ERROR API-CLIENT: ', e.response);
      //   if (!error.response && !error.status) {
      //     return Promise.reject(error);
      //   }

      //   e.response.status === 401 && (await logOut());

      //   if (e.response && error.response.status === 403) {
      //     // window.isAccessDenied = true;
      //     window['showAccessDeniedModal']();
      //   }

      return Promise.reject(error);
    }
  );
}

export default client;
