import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Zoom from 'react-img-zoom'
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useProducto } from '../../contexts/ProductContext';
import Alert from "../alertas/Alert";

function ViewProducto() {

   const { productos } = useProducto();
   const [alert, setAlert] = useState(null);
   const params = useParams();

   const [producto, setProducto] = useState(null);

   useEffect(() => {
      if (productos.length > 0) {
         const productoEncontrado = productos.find((p) => p.id === parseInt(params.id));
         setProducto(productoEncontrado);
      }
   }, [productos, params.id]);

   const [selectedTalla, setSelectedTalla] = useState(35);

   const categoria = () => {
      //TODO consumir categorias
      
      const categorias = {
         'camisetas': 1,
         'tenis': 2,
         'pantalones': 3
      }
      let foundCat = Object.keys(categorias).find(
         (cat) => {producto.categoria.includes(cat)}
      )
      console.warn(foundCat);
      return foundCat
      
   }

   const navigate = useNavigate();

   const { dispatch } = useCart();
   const { isAuthenticated } = useAuth();

   const addToCart = () => {
      if (isAuthenticated) {
         const carrito = { ...producto };
         carrito.talla = selectedTalla;
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

   const handleClick = () => {
      const phoneNumber = '+573237637591';
      const message = 'Hola, ¿cómo estás?. Tengo unas dudas acerca de un producto.';

      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
   };

   const handleTallaChange = (event) => {
      const newTalla = parseInt(event.target.value);
      setSelectedTalla(newTalla);
   };

   const precioOperado = () => {
      if (producto) {
         const resultado = producto.precio - (producto.precio * (producto.descuento / 100));
         return resultado
      }
      return 0
   }

   const precioFormateado = precioOperado().toLocaleString('en-US');

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
            producto ?
               <div className='container mx-auto mt-10 flex justify-center font-lexend'>
                  <div className='max-w-5xl w-full grid grid-cols-12 max-md:space-y-4'>
                     <div className='col-span-6 max-md:col-span-12 max-md:justify-center max-md:scale-90 overflow-hidden flex justify-end'>
                        <Zoom img={producto.image}
                           zoomScale={2}
                           width={450}
                           height={450}
                           transitionTime={0.5}
                        />
                     </div>
                     <div className='col-span-1' />
                     <div className='col-span-5 max-md:col-span-12 bg p-4 max-sm:mx-4 rounded-lg flex flex-col justify-between bg-rose-50'>
                        <div>
                           <p className='text-xs text-stone-400'>Categoría | {categoria()}</p>
                           <h1 className='text-xl font-extrabold text-black'>{producto.nombre}</h1>
                           <h1>{producto.descripcion}</h1>
                           <div className='my-4'>
                              {
                                 producto.descuento > 0 ?
                                    <div className='text-xs'>
                                       <p className='text-lg'>$ {precioFormateado}</p>
                                       <p className='text-stone-400 italic -translate-y-1.5 line-through'>$ {(producto.precio).toLocaleString('en-US')}</p>
                                    </div>
                                    :
                                    <p className='text-xs'>
                                       <p className='text-lg'>$ {precioFormateado}</p>
                                    </p>
                              }

                              <p className='text-xs'>El <b className='underline'>costo de envío</b> se calculan en el carrito de compras.</p>
                           </div>
                           <p className='font-semibold'>Talla</p>

                           <div className='flex radio-inputs w-52 text-sm relative flex-wrap rounded-md'>
                              <label className="radio text-center">
                                 <input
                                    type="radio"
                                    name={producto.id}
                                    value={35}
                                    className='hidden'
                                    checked={selectedTalla === 35}
                                    onChange={handleTallaChange} />
                                 <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">35</span>
                              </label>
                              <label className="radio text-center">
                                 <input
                                    type="radio"
                                    name={producto.id}
                                    value={36}
                                    className='hidden'
                                    checked={selectedTalla === 36}
                                    onChange={handleTallaChange} />
                                 <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">36</span>
                              </label>
                              <label className="radio text-center">
                                 <input
                                    type="radio"
                                    name={producto.id}
                                    value={37}
                                    className='hidden'
                                    checked={selectedTalla === 37}
                                    onChange={handleTallaChange} />
                                 <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">37</span>
                              </label>
                              <label className="radio text-center">
                                 <input
                                    type="radio"
                                    name={producto.id}
                                    value={38}
                                    className='hidden'
                                    checked={selectedTalla === 38}
                                    onChange={handleTallaChange} />
                                 <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">38</span>
                              </label>
                              <label className="radio text-center">
                                 <input
                                    type="radio"
                                    name={producto.id}
                                    value={39}
                                    className='hidden'
                                    checked={selectedTalla === 39}
                                    onChange={handleTallaChange} />
                                 <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">39</span>
                              </label>
                              <label className="radio text-center">
                                 <input
                                    type="radio"
                                    name={producto.id}
                                    value={40}
                                    className='hidden'
                                    checked={selectedTalla === 40}
                                    onChange={handleTallaChange} />
                                 <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">40</span>
                              </label>
                           </div>

                           <Link to={'/sizes'} className='flex items-center hover:underline my-2.5 text-stone-400 w-fit'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3.5 h-3.5">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                              </svg>
                              <p className='ml-1 text-xs'>Tabla de Medidas</p>
                           </Link>
                        </div>

                        <div>
                           <div className='grid grid-cols-12 rounded-lg text-center py-2 mx-8 space-x-2'>
                              <div className='col-span-1 flex justify-center items-center'>
                                 <svg className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                 </svg>
                              </div>
                              <div className='col-span-11'>
                                 <p className='text-xs'>Si tienes alguna duda, ¡No dudes en contactarnos a través de <button onClick={handleClick} className='hover:underline'>WhatsApp</button>!</p>
                              </div>
                           </div>
                           <div className='flex justify-center w-full mt-4'>
                              <button onClick={addToCart}
                                 data-ripple-light="true" type="button"
                                 className="select-none rounded-lg bg-black py-3 w-full text-center align-middle font-sans 
                  text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg
                   hover:shadow-stone-500/50 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none 
                   disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                 Comprar
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               :
               <p className='container mx-auto mt-10'>No se ha encontrado el producto.</p>
         }
      </>
   )
}

export default ViewProducto