import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import Alert from "../../alertas/Alert";

function CardProductos({ producto }) {

   const params = useParams();
   const [alert, setAlert] = useState(null);

   const navigate = useNavigate();

   const { dispatch } = useCart();
   const { isAuthenticated } = useAuth();

   const addToCart = () => {
      if (isAuthenticated) {
         const carrito = { ...producto };
         carrito.talla = 35;
         carrito.precio = precioOperado();
         dispatch({ type: "ADD_TO_CART", payload: carrito });
         setAlert({
            title: 'Producto Agregado',
            desc: 'El producto ha sido agregado al carrito exitosamente.',
            bg_color: 'bg-green-100',
            border_color: 'border-green-500',
            text_color: 'text-green-900',
            svg_color: 'text-green-500',
            bar_color: 'bg-green-500'
         })
         return;
      }
      return navigate('/login');
   };

   const precioOperado = () => {
      const resultado = producto.precio - (producto.precio * (producto.descuento / 100));
      return resultado
   }

   const precioFormateado = precioOperado().toLocaleString('en-US');

   const NavigateToviewProducto = () => {
      navigate(`/productos/view/${producto.id}`);
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
                     bar_color: alert.bar_color
                  }}
                  onClick={() => setAlert(null)}
               />
            )
         }
         {
            params && parseInt(params.categoria) === producto.categoria ?
               <div className="max-sm:scale-90 col-span-3 mt-10 mb-5 relative flex justify-between w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                  <button className='cursor-pointer text-start' onClick={() => { NavigateToviewProducto() }}>
                     <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center">
                        <img src={producto.image} alt={producto.id} />
                        {
                           producto.descuento > 0 && (
                              <div className="absolute top-0 right-0">
                                 <div className="w-32 h-8 absolute top-4 -right-8">
                                    <div
                                       className="h-4/5 w-full bg-red-500 text-white text-center leading-8 font-semibold transform rotate-45
                     flex justify-center items-center">
                                       {producto.descuento}% OFF
                                    </div>
                                 </div>
                              </div>
                           )
                        }
                     </div>
                     <div className="p-6">
                        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                           {producto.nombre}
                        </h5>
                        <p className="block font-sans text-base font-light leading-4 mb-2 text-inherit antialiased">
                           {producto.descripcion}
                        </p>
                        {
                           producto.descuento > 0 ?
                              <div className='text-lg italic'>
                                 $ {precioFormateado}
                                 <p className='text-stone-300 italic -translate-y-1.5 line-through'>$ {(producto.precio).toLocaleString('en-US')}</p>
                              </div>
                              :
                              <p className='text-lg italic'>
                                 $ {precioFormateado}
                              </p>
                        }
                     </div>
                  </button>
                  <div className="p-6 pt-0 mx-auto">
                     <button onClick={addToCart}
                        data-ripple-light="true" type="button"
                        className="select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans 
         text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg
          hover:shadow-stone-500/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
          disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Comprar
                     </button>
                  </div>
               </div>
               : params && parseInt(params.coleccion) === producto.coleccion ?
                  <div className="max-sm:scale-90 col-span-3 mt-10 mb-5 relative flex justify-between  w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                     <button className='cursor-pointer text-start' onClick={() => { NavigateToviewProducto() }}>
                        <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center">
                           <img src={producto.image} alt={producto.id} />
                           {
                              producto.descuento > 0 && (
                                 <div className="absolute top-0 right-0">
                                    <div className="w-32 h-8 absolute top-4 -right-8">
                                       <div
                                          className="h-4/5 w-full bg-red-500 text-white text-center leading-8 font-semibold transform rotate-45
                  flex justify-center items-center">
                                          {producto.descuento}% OFF
                                       </div>
                                    </div>
                                 </div>
                              )
                           }
                        </div>
                        <div className="p-6">
                           <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                              {producto.nombre}
                           </h5>
                           <p className="block font-sans text-base font-light leading-4 mb-2 text-inherit antialiased">
                              {producto.descripcion}
                           </p>
                           {
                              producto.descuento > 0 ?
                                 <div className='text-lg italic'>
                                    $ {precioFormateado}
                                    <p className='text-stone-300 italic -translate-y-1.5 line-through'>$ {(producto.precio).toLocaleString('en-US')}</p>
                                 </div>
                                 :
                                 <p className='text-lg italic'>
                                    $ {precioFormateado}
                                 </p>
                           }
                        </div>
                     </button>
                     <div className="p-6 pt-0 mx-auto">
                        <button onClick={addToCart}
                           data-ripple-light="true" type="button"
                           className="select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans 
      text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg
       hover:shadow-stone-500/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
       disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                           Comprar
                        </button>
                     </div>
                  </div>
                  : params.categoria === undefined && params.coleccion === undefined &&
                  <div className="max-sm:scale-90 col-span-3 mt-10 mb-5 relative flex justify-between  w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                     <button className='cursor-pointer text-start' onClick={() => { NavigateToviewProducto() }}>
                        <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center">
                           <img src={producto.image} alt={producto.id} />
                           {
                              producto.descuento > 0 && (
                                 <div className="absolute top-0 right-0">
                                    <div className="w-32 h-8 absolute top-4 -right-8">
                                       <div
                                          className="h-4/5 w-full bg-red-500 text-white text-center leading-8 font-semibold transform rotate-45
                     flex justify-center items-center">
                                          {producto.descuento}% OFF
                                       </div>
                                    </div>
                                 </div>
                              )
                           }
                        </div>
                        <div className="p-6">
                           <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                              {producto.nombre}
                           </h5>
                           <p className="block font-sans text-base font-light leading-4 mb-2 text-inherit antialiased">
                              {producto.descripcion}
                           </p>
                           {
                              producto.descuento > 0 ?
                                 <div className='text-lg italic'>
                                    $ {precioFormateado}
                                    <p className='text-stone-300 italic -translate-y-1.5 line-through'>$ {(producto.precio).toLocaleString('en-US')}</p>
                                 </div>
                                 :
                                 <p className='text-lg italic'>
                                    $ {precioFormateado}
                                 </p>
                           }
                        </div>
                     </button>
                     <div className="p-6 pt-0 mx-auto">
                        <button onClick={addToCart}
                           data-ripple-light="true" type="button"
                           className="select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans 
         text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg
          hover:shadow-stone-500/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
          disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                           Comprar
                        </button>
                     </div>
                  </div>
         }
      </>
   )
}

export default CardProductos