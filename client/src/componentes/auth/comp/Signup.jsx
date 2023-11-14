import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext";
import Alert from "../../alertas/Alert";


function Signup() {

   const [formData, setFormData] = useState({
      first_name: "",
      last_name: "",
      cedula: "",
      address: "",
      email: "",
      password: "",
      conf_password: "",
      permissions: false,
   });

   const [alert, setAlert] = useState(null);

   const { register } = useAuth()

   const navigate = useNavigate()

   const handleSubmit = async (event) => {
      try {
         event.preventDefault();

         if (formData.conf_password !== formData.password) {
            const customError = {
               codigo_de_error: 400,
               titulo: "Contraseñas NO Coinciden",
               message: "Las contraseñas que ingresaste no coinciden. Por favor revisa el formulario.",
               type: "Error",
            };
            setAlert({
               title: customError.titulo,
               desc: customError.message,
               bg_color: 'bg-red-100',
               border_color: 'border-red-500',
               text_color: 'text-red-900',
               svg_color: 'text-red-500',
               bar_color: 'bg-red-500',
            })
            return;
         }

         if (formData.permissions !== true) {
            const customError = {
               codigo_de_error: 400,
               titulo: "Falta de Aceptación de Términos y Condiciones",
               message: "No has aceptado los términos y condiciones necesarios para completar el proceso de registro.",
               type: "Error de Validación",
            };
            setAlert({
               title: customError.titulo,
               desc: customError.message,
               bg_color: 'bg-red-100',
               border_color: 'border-red-500',
               text_color: 'text-red-900',
               svg_color: 'text-red-500',
               bar_color: 'bg-red-500',
            })
            return;
         }

         const data = {
            "email": formData.email,
            "password": formData.password,
            "first_name": formData.first_name,
            "last_name": formData.last_name,
            "information": {
               "identification": formData.cedula,
               "address": formData.address
            }
         }

         const response = await register(data);
         console.log("response", response);
         if (response.status === 201) {
            navigate('/login', {
               state: {
                  title: 'Cuenta creada',
                  desc: 'La cuenta ha sido creada satisfactoriamente. Por favor, inicia sesión.',
                  bg_color: 'bg-teal-100',
                  border_color: 'border-teal-500',
                  text_color: 'text-teal-900',
                  svg_color: 'text-teal-500',
               }
            });
         }
      } catch (error) {
         console.error(error);
         setAlert({
            title: 'Error al Crear el Usuario',
            desc: 'Parece que este usuario ya ha sido registrado. Por favor, utiliza credenciales distinas.',
            bg_color: 'bg-red-100',
            border_color: 'border-red-500',
            text_color: 'text-red-900',
            svg_color: 'text-red-500',
            bar_color: 'bg-red-500',
         })
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
                     bar_color: alert.bar_color,
                  }}
                  onClick={() => setAlert(null)}
               />
            )
         }
         <form onSubmit={handleSubmit} className="col-span-1 max-sm:col-span-3 flex justify-center items-center flex-col m-4">
            <div className='text-center mb-2 flex items-center flex-col'>
               <Link to={'/'} className='mb-2'>
                           <img src="/favicon/favicon.webp" alt="Logo" width={120} />
               </Link>
               <h1 className='font-extrabold text-3xl'>Crear una Cuenta</h1>
               <p className='text-gray-400'>¿Ya tienes una cuenta? <Link to='/login' className='font-bold text-black hover:text-blue-500'>Inicia Sesión</Link></p>
            </div>

            <div className='space-y-2 max-w-md w-full grid grid-cols-4 space-x-4'>
               <div className='col-span-4 grid grid-cols-11 !ml-0'>
                  <div className='col-span-5'>
                     <label htmlFor="first_name" className="mb-2 text-xs font-bold">Nombre</label>
                     <input id="first_name"
                        type="text"
                        name="first_name"
                        className="text-sm rounded-lg block w-full p-2.5 bg-gray-100"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className='col-span-1' />
                  <div className='col-span-5'>
                     <label htmlFor="last_name" className="mb-2 text-xs font-bold">Apellido</label>
                     <input id="last_name"
                        type="text"
                        name="last_name"
                        className="text-sm rounded-lg block w-full p-2.5 bg-gray-100"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                     />
                  </div>
               </div>

               <div className="col-span-4 !ml-0 grid grid-cols-9">
                  <div className="col-span-4 truncate">
                     <label htmlFor="cedula" className="mb-2 text-xs font-bold">Número de Identidad</label>
                     <input id="cedula"
                        type="number"
                        name="cedula"
                        className="text-sm rounded-lg block w-full p-2.5 bg-gray-100"
                        value={formData.cedula}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className="col-span-1" />
                  <div className="col-span-4">
                     <label htmlFor="address" className="text-xs font-bold">Dirección</label>
                     <input id="address"
                        type="text"
                        name="address"
                        className="text-sm rounded-lg block w-full p-2.5 bg-gray-100"
                        placeholder="(País, Ciudad, Av, Cll)"
                        value={formData.address}
                        onChange={handleChange}
                        required
                     />
                  </div>
               </div>

               <div className='col-span-4 !ml-0'>
                  <label htmlFor="email" className="mb-2 text-xs font-bold">Email</label>
                  <input id="email"
                     type="email"
                     name="email"
                     className="text-sm rounded-lg w-full p-2.5 bg-gray-100"
                     value={formData.email}
                     onChange={handleChange}
                     required
                  />
               </div>

               <div className='col-span-4 grid grid-cols-11 !ml-0'>
                  <div className='col-span-5'>
                     <label htmlFor="password" className="mb-2 text-xs font-bold">Contraseña</label>
                     <input id="password"
                        type="password"
                        name="password"
                        className="text-sm rounded-lg w-full p-2.5 bg-gray-100"
                        value={formData.password}
                        onChange={handleChange}
                        required

                     />
                  </div>
                  <div className='col-span-1' />
                  <div className='col-span-5'>
                     <div className='truncate'>
                        <label htmlFor="conf_password" className="mb-2 text-xs font-bold">Confirmar Contraseña</label>
                     </div>
                     <input id="conf_password"
                        type="password"
                        name="conf_password"
                        className="text-sm rounded-lg w-full p-2.5 bg-gray-100"
                        value={formData.conf_password}
                        onChange={handleChange}
                        required
                     />
                  </div>
               </div>

               <div className='col-span-4 flex space-x-2 !ml-0 justify-center py-2'>
                  <input id="permissions"
                     type="checkbox"
                     name="permissions"
                     checked={formData.permissions}
                     onChange={handleChange}
                     required
                  />
                  <p>Acepto los <Link to='/termsycond' className='font-bold hover:text-blue-500'>Términos y Condiciones.</Link></p>
               </div>

               <div className='text-center col-span-4 !ml-0'>
                  <button type="submit" className='bg-black w-full text-white py-2 rounded-lg max-sm:mb-8'>
                     Crear cuenta
                  </button>
               </div>
            </div>
         </form >
      </>
   )
}

export default Signup