import { Link } from "react-router-dom"

function Notfound() {
   return (
      <>
         <div className="flex flex-col justify-center items-center h-80 mt-12 text-center">
            <Link to={'/'} className="btn404 max-md:scale-50">
            </Link>
            <div className="max-md:scale-90 md:mt-4 flex flex-row items-center">
              <div className=""> 
                  <h1 className="font-bold text-3xl">Pagina no encontrada.</h1>
                  <p className="text-black font-lexend font-normal">¡Ups! No pudimos encontrar la página que estás buscando.</p>
                  <p className="text-black font-lexend font-semibold mt-2"><Link to={'/'} className="underline text-blue-500 hover:text-blue-700">Click aquí</Link> para volver.</p>
               </div>
               <img className="w-64 h-64 ml-16" src="https://media.tenor.com/jzoRah_YGjUAAAAC/cat-cute.gif"/>
            </div>
         </div>
      </>
   )
}

export default Notfound