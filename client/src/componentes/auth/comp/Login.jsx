import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext";
import Alert from "../../alertas/Alert";

function Login() {

   const [formData, setFormData] = useState({
      username: "",
      password: "",
   });

   const { login, getUsuario } = useAuth();

   const handleSubmit = async (event) => {
      try {
         event.preventDefault();

         const data = {
            "username": formData.username,
            "password": formData.password
         }

         console.log("data", data);

         const response = await login(data);
         if (response.status === 200) await getUsuario();
         else setAlert({
            title: 'Error al Iniciar Sesión',
            desc: 'Credenciales incorrectas. Por favor, intenta de nuevo.',
            bg_color: 'bg-red-100',
            border_color: 'border-red-500',
            text_color: 'text-red-900',
            svg_color: 'text-red-500',
            bar_color: 'bg-red-500'
         })
      } catch (error) {
         setAlert({
            title: 'Error Inesperado',
            desc: 'Ups, ocurrió un error inesperado. Por favor, inténtalo nuevamente.',
            bg_color: 'bg-red-100',
            border_color: 'border-red-500',
            text_color: 'text-red-900',
            svg_color: 'text-red-500',
            bar_color: 'bg-red-500'
         })
         console.error(error);
      }
   };

   const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      const newValue = type === "checkbox" ? checked : value;

      setFormData({
         ...formData,
         [name]: newValue,
      });
   };

   const location = useLocation();
   const [alert, setAlert] = useState(location.state ? location.state : null);

   return (
      <>
         {
            alert && (
               <Alert
                  msg={{
                     title: alert.title,
                     desc: alert.desc,
                     bg_color: alert.bg_color,
                     border_color: alert.border_color,
                     text_color: alert.text_color,
                     svg_color: alert.svg_color,
                     bar_color: alert.bar_color
                  }}
                  onClick={() => setAlert(null)}
               />
            )
         }
         <form onSubmit={handleSubmit} className="col-span-1 max-sm:col-span-3 flex justify-center items-center flex-col mx-6 my-5">
            <div className='text-center mb-2 flex items-center flex-col'>
               <Link to={'/'} className='mb-2'>
                           <img src="/favicon/favicon.webp" alt="Logo" width={120} />
               </Link>
               <h1 className='font-black text-3xl'>
                  Inicio de sesión
               </h1>
               <p className='text-gray-400'>¿Ya tienes cuenta? <Link to='/signup' className='font-bold text-black hover:text-blue-500'>Crea una Cuenta</Link></p>
            </div>
            <div className='space-y-4 max-w-md w-full'>
               <div>
                  <label htmlFor="username" className="block text-sm font-bold">Email</label>
                  <input type="email" name="username" id="username" className="text-sm rounded-lg w-full p-2.5 bg-gray-100" required
                     onChange={handleChange} value={formData.username} />
               </div>
               <div>
                  <label htmlFor="password" className="block text-sm font-bold">Contraseña</label>
                  <input type="password" name="password" id="password"
                     className="text-sm rounded-lg w-full p-2.5 dark:placeholder-gray-400 bg-gray-100" required
                     onChange={handleChange} value={formData.password} />
               </div>
               <div className='text-center'>
                  <button type="submit" className='bg-black w-full text-white py-2 rounded-lg max-sm:mb-8'>
                     Ingresar
                  </button>
               </div>
            </div>
         </form>
      </>
   )
}

export default Login