import React, { useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import Alert from '../../alertas/Alert';

function Profile() {
   const { user, editUser } = useAuth()
   const [alert, setAlert] = useState(null);

   const [formData, setFormData] = useState({
      'first_name': user.first_name,
      'last_name': user.last_name,
      'information': {
         'address': user.information.address,
      },
      'email': user.email,
   });

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         await editUser(formData);
         location.reload();
      } catch (error) {
         console.error(error);
         setAlert({
            title: 'Error al Editar Perfil',
            desc: 'Ups, hubo un problema al editar el perfil. Por favor, inténtalo con diferentes datos.',
            bg_color: 'bg-yellow-100',
            border_color: 'border-yellow-500',
            text_color: 'text-yellow-900',
            svg_color: 'text-yellow-500',
            bar_color: 'bg-yellow-500',
         })
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === 'address' && value !== '') {
         setFormData({
            ...formData,
            information: {
               [name]: value
            }
         })
      }
      else if (name === 'address' && value === '') {
         setFormData({
            ...formData,
            information: {
               [name]: user.information[name]
            }
         })
      }
      else if (value !== '') {
         setFormData({
            ...formData,
            [name]: value,
         });
      } else {
         setFormData({
            ...formData,
            [name]: user[name],
         });
      }
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
         <div className='container mx-auto mt-10 font-lexend'>
            <form onSubmit={handleSubmit} className="col-span-1 max-sm:col-span-3 flex justify-center items-center flex-col m-4 text-black">
               <div className='text-center mb-2'>
                  <h1 className='font-extrabold text-black text-3xl'>Editar Perfil</h1>
               </div>

               <div className='space-y-2 max-w-md w-full grid grid-cols-4 space-x-4'>
                  <div className='col-span-4 grid grid-cols-11 !ml-0'>
                     <div className='col-span-5'>
                        <label htmlFor="first_name" className="mb-2 text-xs font-bold">Nombre</label>
                        <input id="first_name"
                           type="text"
                           name="first_name"
                           placeholder={user.first_name}
                           className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           onChange={handleChange}
                        />
                     </div>
                     <div className='col-span-1' />
                     <div className='col-span-5'>
                        <label htmlFor="last_name" className="mb-2 text-xs font-bold">Apellido</label>
                        <input id="last_name"
                           type="text"
                           name="last_name"
                           placeholder={user.last_name}
                           className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           onChange={handleChange}
                        />
                     </div>
                  </div>

                  <div className="col-span-4 !ml-0 grid grid-cols-11">
                     <div className="col-span-5 truncate">
                        <label htmlFor="cedula" className="mb-2 text-xs font-bold">Número de Identidad</label>
                        <input id="cedula"
                           type="number"
                           name="cedula"
                           placeholder={user.information.identification}
                           className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           disabled
                           readOnly
                        />
                     </div>
                     <div className="col-span-1" />
                     <div className='col-span-5'>
                        <label htmlFor="email" className="mb-2 text-xs font-bold">Email</label>
                        <input id="email"
                           type="email"
                           name="email"
                           placeholder={user.email}
                           className="text-sm rounded-lg w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                           onChange={handleChange}
                        />
                     </div>
                  </div>

                  <div className='col-span-4 !ml-0'>
                     <label htmlFor="address" className="text-xs font-bold">Dirección</label>
                     <input id="address"
                        type="text"
                        name="address"
                        placeholder={user.information.address}
                        className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder:text-gray-400"
                        onChange={handleChange}
                     />
                  </div>

                  <div className='text-center col-span-4 !ml-0 pt-4'>
                     <button type="submit" className='bg-black w-full text-white py-2 rounded-lg max-sm:mb-8'>
                        Guardar cambios
                     </button>
                  </div>
               </div>
            </form >
         </div>
      </>
   )
}

export default Profile