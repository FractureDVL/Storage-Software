import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducto } from '../../../contexts/ProductContext';

function ListaCateg() {
   const { categorias }= useProducto([]);

   return (
     <div className='flex justify-around border-r-30'>
       {categorias.map((category) => (
         <Link key={category.name} to={`/productos/categ/${category.id}`} className="p-4 clickable " >
            <div className="border-2 border-solid rounded-lg border-black flex flex-col items-center px-5 py-2 " key={category.id}>
           <h3 className='font-cursive'>{category.nombre}</h3>
           <img className="w-36 h-36" src={category.icon} alt={`Icono de ${category.name}`} />
           </div>
         </Link>
       ))}
     </div>
   );
};

export default ListaCateg;
