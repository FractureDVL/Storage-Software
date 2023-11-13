import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

function Nosotros() {

   const { nosotros } = useAuth();
   const [aboutus, setaboutus] = useState(null);

   useEffect(() => {
      setaboutus(nosotros)
   }, [nosotros,]);

   return (
      <>
         {
            aboutus ? (
               <div className='mx-4'>
                  {
                     aboutus && aboutus[0] !== undefined &&
                     <div className="container mx-auto my-10 grid grid-cols-2 max-w-5xl items-center">
                        <div className='flex items-center col-span-1 max-md:col-span-2'>
                           <img src={aboutus[0].image} alt="Imagen" className='h-auto w-fit' />
                        </div>
                        <div className='col-span-1 max-md:col-span-2 text-justify p-4 flex flex-col font-lexend'>
                           <h1 className='text-xl font-black text-black'>{aboutus[0].titulo}</h1>
                           <p>{aboutus[0].descripcion}</p>
                        </div>
                     </div>
                  }

                  {
                     aboutus && aboutus[1] !== undefined &&
                     <div className="container mx-auto my-10 grid grid-cols-2 max-w-5xl items-center">
                        <div className='col-span-1 max-md:col-span-2 max-md:order-1 text-justify p-4 flex flex-col font-lexend'>
                           <h1 className='text-xl font-black text-black'>{aboutus[1].titulo}</h1>
                           <p>{aboutus[1].descripcion}</p>
                        </div>
                        <div className='flex items-center col-span-1 max-md:col-span-2'>
                           <img src={aboutus[1].image} alt="Imagen" className='h-auto w-fit' />
                        </div>
                     </div>
                  }

                  {
                     aboutus && aboutus[2] !== undefined &&
                     <div className="container mx-auto my-10 grid grid-cols-2 max-w-5xl items-center">
                        <div className='flex items-center col-span-1 max-md:col-span-2'>
                           <img src={aboutus[2].image} alt="Imagen" className='h-auto w-fit' />
                        </div>
                        <div className='col-span-1 max-md:col-span-2 text-justify p-4 flex flex-col font-lexend'>
                           <h1 className='text-xl font-black text-black'>{aboutus[2].titulo}</h1>
                           <p>{aboutus[2].descripcion}</p>
                        </div>
                     </div>
                  }
               </div>
            )
               :
               <>
                  <div className="container mx-auto my-10 grid grid-cols-2">
                     No se ha encontrado una descripción
                  </div>
               </>
         }
      </>
   )
}

export default Nosotros