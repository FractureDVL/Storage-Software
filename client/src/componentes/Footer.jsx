import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 text-md flex p-10">
      
      <div className='flex items-center flex-shrink-0'>
        <img src={'/favicon/white-logo.png'} alt="Logo" className="w-32 h-32 mr-4" />
        <p> <span>Global Sport</span><br /> © 2023 Global Sport Group. <br />Todos los derechos reservados.</p>
      </div>
      
      <div className="container mx-auto flex justify-end">
        <ul className="list-none p-0">
            <li><Link to={'/'} className=" hover:underline">Inicio</Link></li>
            <li><Link to="#" className=" hover:underline">Contacto</Link></li>
            <li><Link to={'mailto:globalstore@yopmail.com'} className=" hover:underline">Email: globalstore@yopmail.com</Link></li>
            <li><Link to={'/'} className=" hover:underline">Teléfono: (123) 456-7890</Link></li>
            {/* TODO Agregar la ruta del proyecto */}
            <li><Link hrefLang='http://localhost:8000/admin/' className=" hover:underline">¿Eres administrativo?</Link></li>
        </ul>
      </div>

    </footer>
  );
};

export default Footer;
