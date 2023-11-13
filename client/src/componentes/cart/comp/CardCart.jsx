import React, { useState } from 'react'
import { useCart } from '../../../contexts/CartContext';

function CardCart({ product }) {

   const { dispatch } = useCart();
   const [selectedTalla, setSelectedTalla] = useState(product.talla);

   const removeFromCart = () => {
      dispatch({ type: "REMOVE_FROM_CART", payload: product });
   };

   const incrementQuantity = () => {
      if (product.quantity < 10) {
         dispatch({ type: "INCREMENT_QUANTITY", payload: product });
      }
   };

   const decrementQuantity = () => {
      if (product.quantity > 1) {
         dispatch({ type: "DECREMENT_QUANTITY", payload: product });
      }
   };

   const handleTallaChange = (event) => {
      const newTalla = parseInt(event.target.value);
      setSelectedTalla(newTalla);
      product.talla = newTalla;
      dispatch({ type: "EDIT_TALLA", payload: { productId: product.id, newTalla } });
   };

   return (
      <>
         <div className='col-span-12 mt-2 border-delgado py-2 rounded-md grid grid-cols-12 h-fit'>
            <div className="col-span-2 max-sm:col-span-4 relative mx-4 h-16 w-16 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center">
               <img src={product.image} alt={product.id} />
            </div>
            <div className='col-span-5 max-sm:col-span-8 flex flex-col justify-between'>
               <div>
                  <h1 className='font-bold'>{product.nombre}</h1>
                  <p className='text-xs text-gray-400'>{product.descripcion}</p>
               </div>

               <div className='flex items-center radio-inputs w-48 max-sm:w-44 text-xs relative flex-wrap rounded-md mt-1' key={product.id}>
                  <p className='font-semibold mr-2 text-sm'>Talla:</p>
                  <label className="radio text-center">
                     <input
                        type="radio"
                        name={product.id}
                        value={35}
                        className='hidden'
                        checked={selectedTalla === 35}
                        onChange={handleTallaChange} />
                     <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">35</span>
                  </label>
                  <label className="radio text-center">
                     <input
                        type="radio"
                        name={product.id}
                        value={36}
                        className='hidden'
                        checked={selectedTalla === 36}
                        onChange={handleTallaChange} />
                     <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">36</span>
                  </label>
                  <label className="radio text-center">
                     <input
                        type="radio"
                        name={product.id}
                        value={37}
                        className='hidden'
                        checked={selectedTalla === 37}
                        onChange={handleTallaChange} />
                     <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">37</span>
                  </label>
                  <label className="radio text-center">
                     <input
                        type="radio"
                        name={product.id}
                        value={38}
                        className='hidden'
                        checked={selectedTalla === 38}
                        onChange={handleTallaChange} />
                     <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">38</span>
                  </label>
                  <label className="radio text-center">
                     <input
                        type="radio"
                        name={product.id}
                        value={39}
                        className='hidden'
                        checked={selectedTalla === 39}
                        onChange={handleTallaChange} />
                     <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">39</span>
                  </label>
                  <label className="radio text-center">
                     <input
                        type="radio"
                        name={product.id}
                        value={40}
                        className='hidden'
                        checked={selectedTalla === 40}
                        onChange={handleTallaChange} />
                     <span className="talla duration-100 flex cursor-pointer items-center justify-center rounded-md py-1">40</span>
                  </label>
               </div>
            </div>
            <div className='col-span-1 max-lg:hidden' />
            <div className='col-span-4 max-sm:col-span-12 max-lg:col-span-5 space-x-2.5 grid grid-cols-12 justify-items-center items-center'>
               <div className="col-span-4 flex items-center space-x-2">
                  <button
                     className="px-1 py-1 rounded"
                     onClick={decrementQuantity}
                  >
                     -
                  </button>
                  <span className='border-delgado px-2'>{product.quantity}</span>
                  <button
                     className="px-1 py-1 rounded"
                     onClick={incrementQuantity}
                  >
                     +
                  </button>
               </div>
               <h1 className='col-span-6 max-sm:col-span-6 max-sm:w-full justify-end font-semibold flex'>
                  $ {(product.precio * product.quantity).toLocaleString('en-US')}
               </h1>
               <svg className="w-5 h-5 hover:text-red-600 hover:cursor-pointer col-span-1 max-sm:col-span-2" onClick={removeFromCart}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
               </svg>
            </div>
         </div>
      </>
   )
}

export default CardCart