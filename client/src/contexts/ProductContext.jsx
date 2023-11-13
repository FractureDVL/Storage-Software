import { createContext, useContext, useState, useEffect } from 'react';
import { getCategoriesRequest, getProductosRequest } from '../componentes/api/request/product.api';

const ProductContext = createContext();

export const useProducto = () => {
   return useContext(ProductContext);
};

const ProductContextProvider = ({ children }) => {
   const [productos, setProductos] = useState([]);
   const [categorias, setCategorias] = useState([]);

   const getProductos = async () => {
      try {
         const response = await getProductosRequest();
         if (response.status === 200) {
            setProductos(response.data);
         } else {
            const customError = {
               codigo_de_error: 500,
               titulo: "No se encuentran los productos",
               message: "No se encuentran o no existen los productos que estás buscando.",
               type: "Error",
            };
            throw customError;
         }
      } catch (error) {
         console.error(error);
      }
   }

   const getCategories = async () => {
      const response  = await getCategoriesRequest()
      setCategorias(response.data)
   }

   useEffect(() => {
      getProductos();
      getCategories();
   }, []);

   return (
      <ProductContext.Provider value={{ productos, categorias }}>
         {children}
      </ProductContext.Provider>
   );
};

export default ProductContextProvider;