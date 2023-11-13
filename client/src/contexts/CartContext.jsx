import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getCuponRequest, getPedidosRequest, pedidoRequest } from '../componentes/api/request/product.api.js'

const CartContext = createContext();

const initialState = {
   cart: [],
   totalPrice: 0
};

const calculateTotalPrice = (cart) => {
   const totalPrice = cart.reduce((total, item) => {
      return total + item.precio * item.quantity;
   }, 0);
   return totalPrice;
};

const cartReducer = (state, action) => {
   switch (action.type) {
      case "ADD_TO_CART":
         const existingProduct = state.cart.find((item) => item.id === action.payload.id);

         if (existingProduct) {
            if (existingProduct.quantity < 10) {
               const updatedCart = state.cart.map((item) =>
                  item.id === action.payload.id
                     ? { ...item, quantity: item.quantity + 1 }
                     : item
               );
               const updatedPrice = calculateTotalPrice(updatedCart);
               return {
                  ...state,
                  cart: updatedCart,
                  totalPrice: updatedPrice,
               };
            }
         } else {
            const updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
            const updatedPrice = calculateTotalPrice(updatedCart);
            return {
               ...state,
               cart: updatedCart,
               totalPrice: updatedPrice,
            };
         }
         return state;

      case "REMOVE_FROM_CART":
         const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
         const updatedPrices = calculateTotalPrice(updatedCart);
         return {
            ...state,
            cart: updatedCart,
            totalPrice: updatedPrices,
         };

      case "INCREMENT_QUANTITY":
         if (action.payload.quantity < 10) {
            const updatedCart = state.cart.map((item) =>
               item.id === action.payload.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            );
            const updatedPrice = calculateTotalPrice(updatedCart);
            return {
               ...state,
               cart: updatedCart,
               totalPrice: updatedPrice,
            };
         }
         return state;

      case "DECREMENT_QUANTITY":
         if (action.payload.quantity > 1) {
            const updatedCart = state.cart.map((item) =>
               item.id === action.payload.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
            );
            const updatedPrice = calculateTotalPrice(updatedCart);
            return {
               ...state,
               cart: updatedCart,
               totalPrice: updatedPrice,
            };
         }
         return state;

      case "CALCULATE_TOTAL_PRICE":
         const totalPriceCalc = calculateTotalPrice(state.cart);
         return {
            ...state,
            totalPrice: totalPriceCalc,
         };

      case "SET_CART":
         const updatedPrice = calculateTotalPrice(action.payload);
         return {
            ...state,
            cart: action.payload,
            totalPrice: updatedPrice,
         };

      case "EDIT_TALLA":
         const { productId, newTalla } = action.payload;
         const updateCart = state.cart.map((item) =>
            item.id === productId ? { ...item, talla: newTalla } : item
         );
         return {
            ...state,
            cart: updateCart,
         };

      default:
         return state;
   }
};

const CartContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, initialState);

   useEffect(() => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
         dispatch({ type: "SET_CART", payload: JSON.parse(cartData) });
      }
   }, []);

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(state.cart));
   }, [state.cart]);

   const getCupon = async (cupon) => {
      try {
         const body = {
            cupon: cupon,
         }
         const response = await getCuponRequest(body, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") },
         });
         if (response.status === 400) {
            console.log(response.data.mensaje);
            return response.data.mensaje
         }

         return response
      } catch (error) {
         console.log("error", error.response.data);
         return error.response
      }
   }

   const pedido = async (pedido) => {
      try {
         console.log(pedido);
         const res = await pedidoRequest(pedido)
         return res
      } catch (error) {
         console.error(error);
         return error.response
      }
   }

   const getPedidos = async () => {
      try {
         const response = await getPedidosRequest({
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") },
         });
         console.log(response.data);
         if (response.status === 200) {
            return response.data
         }
         throw new Error(response)
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <CartContext.Provider value={{ ...state, dispatch, getCupon, pedido, getPedidos }}>
         {children}
      </CartContext.Provider>
   );
};

const useCart = () => {
   const context = useContext(CartContext);
   if (!context) {
      throw new Error("useCart must be used within a CartContextProvider");
   }
   return context;
};

export { CartContextProvider, useCart };