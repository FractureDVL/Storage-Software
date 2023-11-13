import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useProducto } from '../contexts/ProductContext';

const Navbar = () => {
   const location = useLocation();
   const shouldShowNavBar = location.pathname !== '/login' && location.pathname !== '/signup';
   const { categorias } = useProducto();


   const [cursorProduct, setCursorProduct] = useState(false);
   const toggleProductMenu = () => {
      setCursorProduct(true);
   };

   const [cursorColect, setCursorColect] = useState(false);
   const toggleColectMenu = () => {
      setCursorColect(true);
   };

   const [wasClicked, setWasClicked] = useState(false);
   const [menuClicked, setMenuClicked] = useState(false);

   const { isAuthenticated, setUser, setIsAuthenticated } = useAuth();

   const getCategories = async () => {
      const response = getCategoriesRequest()
      console.warn(response.data);
      setCategoryOption(response.data)
   }
   
   const logout = () => {
      localStorage.removeItem('timestamp');
      localStorage.removeItem('refresh');
      localStorage.removeItem('access');
      setUser(null);
      setIsAuthenticated(false);
   }

   const menuButtonRef = useRef(null);

   useEffect(() => {
      function handleClickOutside(event) {
         if (menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
            // El usuario hizo clic fuera del botón o del menú, cierra el menú
            setMenuClicked(false);
         }
      }

      // Agregar un manejador de eventos al documento para detectar clics fuera del botón o del menú
      document.addEventListener('click', handleClickOutside);

      return () => {
         // Asegurarse de eliminar el manejador de eventos cuando el componente se desmonta
         document.removeEventListener('click', handleClickOutside);
      };
   }, []);

   const toggleMenu = () => {
      setMenuClicked(!menuClicked);
   };

   const contentBadge = () => {
      const carritoxd = JSON.parse(localStorage.getItem('cart'));
      if (carritoxd.length > 10) {
         return '+99'
      }
      return carritoxd.length
   }

   const { cart } = useCart();
   const [cantBadge, setCantBadge] = useState(false);

   useEffect(() => {
      setCantBadge(cart.reduce((total, item) => total + item.quantity, 0));
   }, [cart]);

   return (
     shouldShowNavBar && (
       <>
         <p className="text-center bg-red-500 text-white px-5">
           ¡Obten un 10% de descuento en tu primera compra!
         </p>
         <nav className="h-20 bg-zinc-900 text-white sticky top-0 z-50 grid grid-cols-12 px-10 max-md:px-2 py-0 max-md:items-center">
           <Link
             to="/"
             className="col-span-1 flex justify-center items-center max-md:justify-start max-md:col-span-8 max-sm:col-span-7"
           >
             <img src="/favicon/favicon.png" alt="Inicio" className="h-16" />
           </Link>
           <ul className="col-span-10 flex justify-center max-md:hidden">
             <li className="px-4 h-full">
               <Link
                 to={"/"}
                 className="h-full flex items-center hover:text-blue-500"
               >
                 Inicio
               </Link>
             </li>

             <li className="px-4 h-full">
               <Link
                 to={"/productos"}
                 className="h-full flex items-center hover:text-blue-500"
                 onMouseEnter={toggleProductMenu}
                 onMouseLeave={() => setCursorProduct(false)}
               >
                 Productos <p className="pl-0.5">▾</p>
               </Link>
             </li>

             <li className="text-2xl -translate-y-1 h-full flex items-center px-10 text-center font-cursive not-italic">
               <Link to={"/"}>Global Sport</Link>
             </li>

             <li className="px-4 h-full">
               <Link
                 to={"/aboutus"}
                 className="h-full flex items-center hover:text-blue-500"
               >
                 Nosotros
               </Link>
             </li>
           </ul>
           <div className="font-bold col-span-1 max-md:col-span-3 flex justify-center items-center">
             {isAuthenticated ? (
               <>
                 {cantBadge > 0 ? (
                   <Link to={"/cart"}>
                     <span className="relative">
                       <span className="bg-red-500 text-white p-1 w-5 h-5 not-italic rounded-full text-center text-xs absolute -top-2 -right-2">
                         <p className="-translate-y-1">{contentBadge()}</p>
                       </span>
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width={28}
                         height={28}
                         viewBox="0 0 24 24"
                       >
                         <path
                           fill="none"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeWidth="1.5"
                           d="M20.224 12.526c-.586-3.121-.878-4.682-1.99-5.604C17.125 6 15.537 6 12.362 6h-.722c-3.175 0-4.763 0-5.874.922c-1.11.922-1.403 2.483-1.989 5.604c-.822 4.389-1.234 6.583-.034 8.029C4.942 22 7.174 22 11.639 22h.722c4.465 0 6.698 0 7.897-1.445c.696-.84.85-1.93.696-3.555M9 6V5a3 3 0 1 1 6 0v1"
                         />
                       </svg>
                     </span>
                   </Link>
                 ) : (
                   <Link to={"/cart"}>
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width={28}
                       height={28}
                       viewBox="0 0 24 24"
                     >
                       <path
                         fill="none"
                         stroke="currentColor"
                         strokeLinecap="round"
                         strokeWidth="1.5"
                         d="M20.224 12.526c-.586-3.121-.878-4.682-1.99-5.604C17.125 6 15.537 6 12.362 6h-.722c-3.175 0-4.763 0-5.874.922c-1.11.922-1.403 2.483-1.989 5.604c-.822 4.389-1.234 6.583-.034 8.029C4.942 22 7.174 22 11.639 22h.722c4.465 0 6.698 0 7.897-1.445c.696-.84.85-1.93.696-3.555M9 6V5a3 3 0 1 1 6 0v1"
                       />
                     </svg>
                   </Link>
                 )}
                 <div className="relative ml-3">
                   <button
                     onClick={toggleMenu}
                     ref={menuButtonRef}
                     type="button"
                     className="relative flex rounded-full bg-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-gray-800"
                     id="user-menu-button"
                     aria-expanded={menuClicked ? "true" : "false"}
                     aria-haspopup="true"
                   >
                     <span className="absolute -inset-1.5"></span>
                     <span className="sr-only">Abrir Menu</span>
                     <img
                       className="h-8 w-8 rounded-full"
                       src="/favicon/profile.webp"
                       alt=""
                     />
                   </button>
                   {menuClicked && (
                     <div
                       className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                       role="menu"
                       aria-orientation="vertical"
                       aria-labelledby="user-menu-button"
                       tabIndex="-1"
                     >
                       <Link
                         to="/profile"
                         className="flex px-4 py-2 text-sm not-italic font-normal text-gray-700"
                         role="menuitem"
                         tabIndex="-1"
                         id="user-menu-item-0"
                       >
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth="1.5"
                           stroke="currentColor"
                           className="w-5 h-5 translate-y-0.5"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                           />
                         </svg>
                         <p className="ml-1.5">Editar Perfil</p>
                       </Link>
                       <Link
                         to="/pedidos"
                         className="flex px-4 py-2 text-sm not-italic font-normal text-gray-700"
                         role="menuitem"
                         tabIndex="-1"
                         id="user-menu-item-0"
                       >
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="w-5 h-5 translate-y-0.5"
                           viewBox="0 0 24 24"
                         >
                           <g
                             fill="none"
                             stroke="currentColor"
                             strokeLinecap="round"
                             strokeWidth="1.5"
                           >
                             <path
                               strokeLinejoin="round"
                               d="m10 14.3l1.333 1.2l2.667-3"
                             />
                             <path d="M9 6V5a3 3 0 1 1 6 0v1m5.224 6.526c-.586-3.121-.878-4.682-1.99-5.604C17.125 6 15.537 6 12.36 6h-.72c-3.176 0-4.764 0-5.875.922c-1.11.922-1.403 2.483-1.989 5.604c-.823 4.389-1.234 6.583-.034 8.029C4.942 22 7.174 22 11.639 22h.722c4.465 0 6.698 0 7.897-1.445c.696-.84.85-1.93.696-3.555" />
                           </g>
                         </svg>
                         <p className="ml-1.5">Mis Pedidos</p>
                       </Link>
                       <button
                         onClick={logout}
                         className="flex px-4 py-2 text-sm not-italic font-normal text-gray-700"
                         role="menuitem"
                         tabIndex="-1"
                         id="user-menu-item-2"
                       >
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth="1.5"
                           stroke="currentColor"
                           className="w-5 h-5 translate-y-0.5"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                           />
                         </svg>
                         <p className="ml-1.5">Cerrar Sesión</p>
                       </button>
                     </div>
                   )}
                 </div>
               </>
             ) : (
               <Link
                 to="/login"
                 className="whitespace-nowrap bg-white text-black px-3 py-3 rounded-lg hover:scale-110 duration-200"
               >
                 Iniciar sesión
               </Link>
             )}
           </div>
           <label className="hamburger cursor-pointer md:hidden col-span-1 scale-90">
             <input
               type="checkbox"
               className="hidden"
               onClick={() => {
                 setWasClicked(!wasClicked);
               }}
             />
             <svg viewBox="0 0 32 32">
               <path
                 className="line line-top-bottom"
                 d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
               ></path>
               <path className="line" d="M7 16 27 16"></path>
             </svg>
           </label>
           <>
             {cursorProduct && (
               <nav
                 className="w-full bg-zinc-900 absolute top-20 border-black border-t-2 px-10 flex justify-center py-5 max-md:hidden"
                 onMouseEnter={toggleProductMenu}
                 onMouseLeave={() => setCursorProduct(false)}
               >
                 <ul className="flex">
                   <li className="px-4">
                     <Link to="/productos" className="hover:text-blue-500">
                       Ver Todo
                     </Link>
                   </li>
                   {categorias.map((categoria) => (
                     <li className="px-4" key={categoria.id}>
                       <Link
                         to={`/productos/${categoria.id}`}
                         className="hover:text-blue-500">
                         {categoria.nombre}
                       </Link>
                     </li>
                   ))}
                 </ul>
               </nav>
             )}
             {wasClicked && (
               <>
                 <nav className="w-full bg-zinc-900 col-span-12 py-1 border-black border-t-2 absolute top-20 md:hidden">
                   <ul className="flex flex-col items-center">
                     <li className="py-0.5">
                       <Link
                         to={"/"}
                         className="flex items-center hover:text-blue-500"
                       >
                         Inicio
                       </Link>
                     </li>

                     <li className="py-0.5">
                       <Link
                         to={"/productos"}
                         className="flex items-center hover:text-blue-500"
                       >
                         Productos
                       </Link>
                     </li>

                     <li className="py-0.5">
                       <Link
                         to={"/aboutus"}
                         className="flex items-center hover:text-blue-500"
                       >
                         Nosotros
                       </Link>
                     </li>
                   </ul>
                 </nav>
               </>
             )}
           </>
         </nav>
       </>
     )
   );
};

export default Navbar;
