import axios from "axios";
import endpoints from "../../endpoints/Endpoints";

export const backendAPI = axios.create({
   baseURL: endpoints.API_BACKEND,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   }
});

function hasFile(data) {
   for (const key in data) {
      if (data.hasOwnProperty(key)) {
         if (data[key] instanceof File || data[key] instanceof Blob) {
            return true;
         }
      }
   }
   return false;
}

function formDataHasFile(formData) {
   if (formData instanceof FormData) {
      for (let value of formData.values()) {
         if (value instanceof File) {
            if (value.name != '') {
               return true;
            }

         }
      }
   }
   return false;
}

backendAPI.interceptors.request.use(
   async (config) => {
      const token = localStorage.getItem("access");

      if (token) {
         try {
            config.headers.Authorization = `Bearer ${token}`;
         } catch (error) {
            console.error(error);
         }

         if (config.data && (config.method === 'post' || config.method === 'patch' || config.method === 'put')) {
            if (formDataHasFile(config.data) || hasFile(config.data)) {
               config.headers['Content-Type'] = 'multipart/form-data';
            }
         }
      }
      return config;
   },
   (error) => {
      console.error(error);
      return Promise.reject(error);
   }
);