import { useEffect, useState } from 'react';
import Select from 'react-select';
import CardProductos from './comp/CardProductos';
import { useProducto } from '../../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';

function Productos() {
   const { productos, categorias } = useProducto();
   const [categOption, setCategOption] = useState(null);

   const CustomCategOption = ({ innerProps, data }) => (
      <div {...innerProps} className="flex items-center ml-2 mb-2">
         <span className='mr-1.5 scale-125'>{data.image}</span>
         {data.label}
      </div>
   );

   const CustomCategSingleValue = ({ innerProps, data }) => (
      <div {...innerProps} className="flex items-center">
         <span className='mr-1.5 scale-125'>{data.image}</span>
         {data.label}
      </div>
   );

   const navigate = useNavigate();

   useEffect(() => {
      setCategOption(categorias[0]); // Asigna la primera categoría por defecto
   }, [categorias]);

   return (
      <div className="container mt-10 mx-auto">
         <div className="flex flex-col justify-center w-full py-6 px-10 max-sm:px-1.5">
            <div className="w-full flex justify-between max-sm:flex-col max-sm: max-sm:space-y-2">
               <Select
                  options={categorias}
                  components={{ Option: CustomCategOption, SingleValue: CustomCategSingleValue }}
                  defaultValue={categOption}
                  className="w-64 max-sm:w-full cursor-pointer"
                  isSearchable={false}
                  value={categOption}
                  onChange={(option) => {
                     setCategOption(option);
                     navigate('/productos/categ/' + option.value);
                  }}
               />
            </div>
            <div className="w-full border-delgado mt-2 rounded-lg py-2 justify-items-center grid grid-cols-12 max-xl:grid-cols-6 max-2xl:grid-cols-9 max-lg:grid-cols-6 max-md:grid-cols-3">
               {productos.map((producto) => (
                  <CardProductos key={producto.id} producto={producto} />
               ))}
            </div>
         </div>
      </div>
   );
}

export default Productos;
