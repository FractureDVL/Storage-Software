import { createContext, useContext, useState, useEffect } from 'react';
import { backendAPI } from '../componentes/api/axiosBackend.api';
import endpoints from '../endpoints/Endpoints.js';
import { editUserRequest, getAboutUsRequest, getUsuarioRequest, loginRequest, registerRequest } from '../componentes/api/request/auth.api';

const AuthContext = createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {

   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)
   const [nosotros, setNosotros] = useState(true)

   useEffect(() => {
      checkAuthentication();
      getAboutUs()
   }, [loading]);

   const getAboutUs = async () => {
      try {
         const response = await getAboutUsRequest();
         setNosotros(response.data)
      } catch (error) {
         console.error(error);
      }
   }

   const checkAuthentication = async () => {
      const token = (localStorage.getItem('access'));
      if (token) {
         const isValidToken = await validateToken(token, setUser);
         setIsAuthenticated(isValidToken);
      }
      setLoading(false);
   };

   const register = async (body) => {
      try {
         const response = await registerRequest(body)
         return response;
      } catch (error) {
         console.error(error);
      }
   }

   const editUser = async (body) => {
      try {
         const response = await editUserRequest(body)
         return response;
      } catch (error) {
         console.error(error);
      }
   }

   const login = async (body) => {
      try {
         const response = await loginRequest(body)
         if (response.status === 200) {
            const now = new Date()
            const expiry = now.getTime() + 5 * 60 * 1000;
            localStorage.setItem("timestamp", expiry.toString());
            localStorage.setItem('access', response.data.access)
            localStorage.setItem('refresh', response.data.refresh)
            checkAuthentication()
         }
         return response;
      } catch (error) {
         console.error(error);
      }
   }

   const getUsuario = async () => {
      try {
         const token = (localStorage.getItem('access'));
         const response = await getUsuarioRequest({
            headers: { 'Authorization': 'Bearer ' + token }
         });
         if (response.status === 200) {
            await setUser(response.data[0]);
            await setIsAuthenticated(true)
         }
         return response
      } catch (error) {
         console.error(error);
      }
   }

   async function validateToken(token) {
      if (token) {
         try {
            const response = await getUsuario()
            if (response.status === 200) {
               return true;
            }
            return false;
         } catch (error) {
            console.error("error", error);
            const timestamp = localStorage.getItem('timestamp')
            const date_now = new Date().getTime()
            if (timestamp - date_now < 300000) {
               console.log("SE HA VENCIDO ASOPJFNAIKLSGNIASNGJIOBNGSJSJÑb");
               return false
            }
            const refresh = localStorage.getItem('refresh');
            if (refresh) {
               let data = JSON.stringify({ refresh })
               try {
                  const response = await backendAPI.post(endpoints.REFRESH, data, {
                     headers: {
                        'Content-Type': 'application/json'
                     }
                  })
                  if (response.status == 200) {
                     localStorage.setItem('access', response.data.access)
                     console.log("YASUFAHBSFGASJKGJNOASAOJ GIAJGNAOJGN", response.data.access);
                     return true
                  }
               } catch (error) {
                  console.error("error", error);
                  return false
               }
            } else {
               return false
            }
         }
      } else {
         return false
      }
   }

   const value = {
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      checkAuthentication,
      loading,
      register,
      login,
      getUsuario,
      nosotros,
      editUser
   };

   return (
      <AuthContext.Provider value={value}>
         {!loading && children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider
