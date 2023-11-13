import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 text-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-1/2">
          <p>Somos una empresa comprometida con la creación de soluciones innovadoras.</p>
        </div>
        <div className="w-1/2 flex justify-end items-center">
          <img src="ruta/al/logo.png" alt="Logo" className="w-8 h-8 mr-4" />
          {/* Reemplaza "ruta/al/logo.png" con la ruta correcta Link tu logo */}
        </div>
      </div>
      <div className="container mx-auto flex justify-between mt-4">
        <div className="w-1/2">
          <ul className="list-disc">
            <li><Link to={'/'}>Inicio</Link></li>
            <li><Link to="#">Contacto</Link></li>
            <li><Link to={'mailto:globalstore@yopmail.com'}>Email: globalstore@yopmail.com</Link></li>
            <li><Link to={'/'}>Teléfono: (123) 456-7890</Link></li>
            <li><Link to="{'/'}">¿Eres administrativo?</Link></li>
          </ul>
        </div>
        <div className="w-1/2 text-center">
          <p>© 2023 Global Sport Group. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
