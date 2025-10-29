import axios from "axios";


// create axios instance 

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {"Content-Type":"Application/json"},
});


// request interceptor add tokens to all requst 

api.interceptors.request.use(
    (config) => {
        // get token 
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Response interceptor - Handle errors globally

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        if (error.response) {
                  const message = error.response.data.message || 'Something went wrong';
              // If 401 (unauthorized), clear token and redirect to login
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
      
              return Promise.reject(new Error(message))
        } else if (error.request) {
            // Request was made but no response
      return Promise.reject(new Error('No response from server'));
            
        } else {
            
            return Promise.reject(error);
        }
    }
)

export default api;