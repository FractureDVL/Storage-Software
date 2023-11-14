import React, { useEffect, useState } from 'react'
import { useCart } from '../../contexts/CartContext'
import DataTable from 'react-data-table-component'

function Pedidos() {

   const [pedidos, setPedidos] = useState({})
   const { getPedidos } = useCart()

   useEffect(() => {
      obtenerPedidos()
   }, [])

   const obtenerPedidos = async () => {
      const res = await getPedidos()
      setPedidos(res)
   }

   const columns = [
      {
         name: 'ID Pedido',
         selector: row => row.id,
         sortable: true,

      },
      {
         name: 'Precio Total',
         selector: row => `$ ${(parseInt((row.precio_total).split('.')[0])).toLocaleString('en-US')}`,
         sortable: true,
      },
      {
         name: 'Fecha Pedido',
         selector: row => (row.fecha).split('T')[0],
         sortable: true,
      },
      {
         name: 'Hora Pedido',
         selector: row => ((row.fecha).split('T')[1]).split('.')[0],
         sortable: true,
      },
      {
         name: 'Empresa de Envíos',
         selector: row => row.empresa_envio,
         sortable: true,
      },
      {
         name: 'Número de Guía',
         selector: row => row.numero_guia,
         sortable: true,
      },
      {
         name: 'Estado del Pedido',
         selector: row => row.estado,
         sortable: true,
      },

   ];

   function handleFilter(event) {
      const searchTerm = event.target.value.toLowerCase();

      const newData = pedidos.filter(row => {
         const idMatch = row.id.toLowerCase().includes(searchTerm);

         return idMatch;
      });

      console.log(newData);
   }

   return (
      <>
         <div className='container mx-auto mt-10 px-2'>
            <div className='flex justify-between items-center px-2'>
               <p className='font-bold text-lg'>Mis Pedidos</p>
               <div>
                  <input type="text" placeholder='Busca un pedido por ID' onChange={handleFilter} className="text-sm rounded-lg p-2.5 border-delgado" />
               </div>
            </div>
            <DataTable
               columns={columns}
               data={pedidos}
               fixedHeader
               pagination={false}
               customStyles={{
                  headCells: {
                     style: {
                        color: '#000',
                        fontWeight: 'bold',
                        borderBottom: '1px solid #eee',
                     },
                  },
                  rows: {
                     style: {
                        background: 'bg-gray-100',
                     },
                  },
                  pagination: {
                     style: {
                        color: '#000',
                     },
                  },
               }}
               noDataComponent={'Aún no haz realizado ningun pedido'}
            />
            <div className='text-center col-span-4 !ml-0'>
               <div className="border-gray-500 border-2 bg-gray-100 text-blue-700 rounded-md my-4 grid grid-cols-12 py-2">
                  <div className="col-span-1 max-sm:col-span-2 flex justify-center items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256"><path fill="currentColor" d="M236.8 188.09L149.35 36.22a24.76 24.76 0 0 0-42.7 0L19.2 188.09a23.51 23.51 0 0 0 0 23.72A24.35 24.35 0 0 0 40.55 224h174.9a24.35 24.35 0 0 0 21.33-12.19a23.51 23.51 0 0 0 .02-23.72Zm-13.87 15.71a8.5 8.5 0 0 1-7.48 4.2H40.55a8.5 8.5 0 0 1-7.48-4.2a7.59 7.59 0 0 1 0-7.72l87.45-151.87a8.75 8.75 0 0 1 15 0l87.45 151.87a7.59 7.59 0 0 1-.04 7.72ZM120 144v-40a8 8 0 0 1 16 0v40a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z" /></svg>
                  </div>
                  <p className="text-md text-justify col-span-11 max-sm:col-span-10 pr-4">
                     Si tienes alguna pregunta o inquietud acerca de tus pedidos, no dudes en contactarnos a través de <a href='mailto:globalsport@yopmail.com' >globalsport@yopmail.com.</a> Estamos aquí para ayudarte y aclarar cualquier duda que puedas tener.
                  </p>

               </div>
               <button type="submit" className='bg-black w-full text-white py-2 rounded-lg max-sm:mb-8'>
                  Pagar
               </button>
            </div>
         </div>
      </>
   )
}

export default Pedidos

