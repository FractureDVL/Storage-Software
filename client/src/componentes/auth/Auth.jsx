import Login from './comp/Login';
import Signup from './comp/Signup';
import { Link, useLocation } from 'react-router-dom';

function Auth() {
   const location = useLocation();

   const RenderForm = () => {
      return location.pathname === '/login' ? <Login /> : <Signup />;
   };

   return (
      <>
         <div className='h-screen w-full font-lexend font-semibold'>
            <div className="grid grid-cols-2 max-md:grid-cols-1 w-full h-full">
            <div className="col-span-1 max-md:col-span-3" style={{ background: 'url("img/banner_login.jpeg")', backgroundSize: 'contain', backgroundPosition: 'center' }}>
                  <div className="h-full flex items-center justify-center rounded-2xl">
                     <div className="flex flex-col items-center px-4 text-center text-white md:">
                        <Link to={'/'} className='mb-2'>
                           <img src="/favicon/white-logo.png" alt="Logo" width={120} />
                        </Link>
                        <p className="text-white font-black text-2xl">Bienvenido a Global Sport</p>
                        <p className='text-sm mt-2'>Bienvenido a Global Sport, tu destino definitivo para la moda deportiva que combina rendimiento, estilo y comodidad.</p>
                     </div>
                  </div>
               </div>
               <RenderForm />
            </div>
         </div>
      </>
   )
}

export default Auth;