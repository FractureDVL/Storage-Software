import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import CardCart from './comp/CardCart';
import { useCart } from '../../contexts/CartContext';
import Alert from '../alertas/Alert';

function Cart() {

   const { cart, totalPrice, getCupon } = useCart();

   const [cantItems, setCantItems] = useState(false);
   const navigate = useNavigate()

   useEffect(() => {
      setCantItems(cart.reduce((total, item) => total + item.quantity, 0));
   }, [cart]);

   const costoEnvio = 15900;

   const [cupon, setCupon] = useState('');
   const [cuponGotten, setCuponGotten] = useState(null);

   const handleCuponSubmit = async (event) => {
      event.preventDefault();
      try {
         const res = await getCupon(cupon);
         if (res.data.mensaje === "Ya ha utilizado este cupon") {
            setCuponGotten(null);
            setAlert({
               title: 'Error al Redimir Cupón',
               desc: `${res.data.mensaje}. Introduce otro o elimina el actual.`,
               bg_color: 'bg-yellow-100',
               border_color: 'border-yellow-500',
               text_color: 'text-yellow-900',
               svg_color: 'text-yellow-500',
               bar_color: 'bg-yellow-500',
            })
            return
         }
         if (res.data.mensaje === "El cupon no existe.") {
            setCuponGotten(null);
            setAlert({
               title: 'Error al Redimir Cupón',
               desc: `${res.data.mensaje}. Introduce otro o elimina el actual.`,
               bg_color: 'bg-yellow-100',
               border_color: 'border-yellow-500',
               text_color: 'text-yellow-900',
               svg_color: 'text-yellow-500',
               bar_color: 'bg-yellow-500',
            })
            return
         }
         setCuponGotten(res)
      } catch (error) {
         console.error(error);
      }
   }

   const [alert, setAlert] = useState(null);

   const checkout = async (event) => {
      event.preventDefault();
      try {
         const productos = cart.map((product) => ({
            producto: product.id,
            cantidad: product.quantity,
            talla: product.talla,
         }));

         const res = await getCupon(cupon);
         console.log(res);

         if (res.data.mensaje === "Ya ha utilizado este cupon") {
            setCuponGotten(null);
            setAlert({
               title: 'Error al Redimir Cupón',
               desc: `${res.data.mensaje}. Introduce otro o elimina el actual.`,
               bg_color: 'bg-yellow-100',
               border_color: 'border-yellow-500',
               text_color: 'text-yellow-900',
               svg_color: 'text-yellow-500',
               bar_color: 'bg-yellow-500',
            })
            return
         }
         if (res.data.mensaje === "El cupon no existe.") {
            setCuponGotten(null);
            setAlert({
               title: 'Error al Redimir Cupón',
               desc: `${res.data.mensaje}. Introduce otro o elimina el actual.`,
               bg_color: 'bg-yellow-100',
               border_color: 'border-yellow-500',
               text_color: 'text-yellow-900',
               svg_color: 'text-yellow-500',
               bar_color: 'bg-yellow-500',
            })
            return
         }
         setCuponGotten(res)

         navigate('/checkout', { state: { productos: productos, cupon: cupon } })
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         <div className='mx-4 mt-10 flex flex-col items-center font-lexend'>
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
            {
               cart.length > 0 ?
                  <div className='grid grid-cols-12 w-full max-w-5xl max-sm:mb-20'>
                     <div className='col-span-8 max-md:col-span-12 max-md:px-0 grid grid-cols-12 rounded-md h-fit py-4 px-4'>
                        <div className='col-span-12 flex justify-between items-center'>
                           <div>
                              <h1 className='font-black text-black'>Carrito de Compras</h1>
                              <p className='text-xs'>Tienes {cantItems} item(s) en tu carrito</p>
                           </div>
                        </div>
                        {
                           cart.map((product) => (
                              <>
                                 <CardCart key={product.id} product={product} />
                              </>
                           ))
                        }
                     </div>
                     <div className='col-span-1 max-lg:hidden' />
                     <div className='col-span-3 max-lg:col-span-4 max-md:col-span-12'>
                        <div className='grid grid-cols-12 border-delgado rounded-md p-5'>
                           <h1 className='col-span-12 font-black text-black mb-4'>Resumen del Pedido</h1>
                           <div className='col-span-12 text-sm flex justify-between'>
                              <h1 className='text-black font-black'>Subtotal:</h1>
                              <p>$ {(totalPrice).toLocaleString('en-US')}</p>
                           </div>
                           <div className='col-span-12 text-sm flex justify-between'>
                              <h1 className='text-black font-black'>Envío:</h1>
                              <p> $ {(costoEnvio).toLocaleString('en-US')}</p>
                           </div>
                           <div className='col-span-12 text-sm flex justify-between'>
                              <h1 className='text-black font-black'>IVA:</h1>
                              <p className='italic text-gray-300'>Incluido</p>
                           </div>
                           <hr className='col-span-12 my-4' />
                           <form onSubmit={(e) => handleCuponSubmit(e)} className='col-span-12 text-sm grid grid-cols-12'>
                              <label htmlFor="cupon" className="text-sm font-bold col-span-11">Redimir Cupon</label>
                              <input
                                 type="text"
                                 name="cupon"
                                 id="cupon"
                                 className="text-sm rounded-lg w-full p-2 border-delgado col-span-7"
                                 required
                                 onChange={(e) => setCupon(e.target.value)}
                              />
                              <div className='col-span-1' />
                              <button className='col-span-4 border-delgado rounded-lg bg-black text-white'>
                                 Aplicar
                              </button>
                           </form>
                           {
                              cuponGotten &&
                              <div className='col-span-12 text-sm flex justify-between mt-2'>
                                 <h1 className='text-black font-black'>Descuento:</h1>
                                 <p>{cuponGotten.descuento}%</p>
                              </div>
                           }
                           <hr className='col-span-12 my-4' />
                           <div className='col-span-12 text-sm flex justify-between'>
                              <h1 className='text-black font-black'>Costo Total:</h1>
                              {
                                 !cuponGotten ?
                                    <p>$ {(costoEnvio + totalPrice).toLocaleString('en-US')}</p>
                                    :
                                    <div>
                                       <p>$ {(Math.round(((totalPrice) - ((totalPrice) * (cuponGotten.descuento / 100))) + costoEnvio)).toLocaleString('en-US')}</p>
                                       <p className='-translate-y-1 italic text-slate-300 line-through text-center'>$ {(costoEnvio + totalPrice).toLocaleString('en-US')}</p>
                                    </div>
                              }
                           </div>
                           <div className='col-span-12 flex justify-center mt-3'>
                              <button onClick={checkout} className='btn bg-black text-white rounded-md'>
                                 <div>
                                    <span>
                                       <p className='w-full'>Continuar Compra</p>
                                    </span>
                                 </div>
                                 <div>
                                    <span>
                                       <p className='w-full flex justify-center'>
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                          </svg>
                                       </p>
                                    </span>
                                 </div>
                              </button>
                           </div>
                        </div>
                     </div >
                  </div>
                  :
                  <>
                     <h1 className='text-6xl font-black text-black mb-10'>Carrito de Compras</h1>
                     <div className='bg-red-400 text-white px-6 py-2 rounded-lg text-xl italic'>
                        No se han encontrado productos en el carrito de compras.
                     </div>
                  </>
            }
         </div>
      </>
   )
}

export default Cart


