import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Home from './componentes/home/Home';
import Auth from './componentes/auth/Auth';
import Notfound from './componentes/notfound/Notfound';
import LoggedRoutes from './ProtectedRoutes/LoggedRoutes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Productos from './componentes/productos/Productos';
import Cart from './componentes/cart/Cart';
import ViewProducto from './componentes/productos/ViewProducto';
import Sizes from './componentes/productos/comp/Sizes';
import Nosotros from './componentes/home/Nosotros';
import Profile from './componentes/auth/comp/Profile';
import Terms from './componentes/home/Terms';
import Pedidos from './componentes/cart/Pedidos';

function App() {

   const { isAuthenticated } = useAuth();
   return (
      <>
         <BrowserRouter>
            <Navbar />
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />
               <Route path='/signup' element={isAuthenticated ? <Navigate to="/" /> : <Auth />} />
               <Route path='/productos' element={<Productos />} />
               <Route path='/productos/categ/:categoria' element={<Productos />} />
               <Route path='/productos/colec/:coleccion' element={<Productos />} />
               <Route path='/productos/view/:id' element={<ViewProducto />} />
               <Route path='/sizes' element={<Sizes />} />
               <Route path='/aboutus' element={<Nosotros />} />
               <Route path='/termsycond' element={<Terms />} />
               <Route element={<LoggedRoutes />}>
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/pedidos' element={<Pedidos />} />
                  <Route path='/profile' element={<Profile />} />
               </Route>
               <Route path='/*' element={<Notfound />} />
            </Routes>
         </BrowserRouter>
      </>
   )
}

export default App