import { Link } from "react-router-dom"

function Notfound() {
   return (
      <>
         <div className="flex flex-col justify-center items-center h-80 mt-12 text-center">
            <Link to={'/'} className="btn404 max-md:scale-50">
               <span className="actual-text">&nbsp;Error&nbsp;404&nbsp;</span>
               <span aria-hidden="true" className="hover-text">&nbsp;Error&nbsp;404&nbsp;</span>
            </Link>
            <div className="max-md:scale-90 md:mt-4">
               <h1 className="font-bold text-3xl text-black font-lexend">PÁGINA NO ENCONTRADA</h1>
               <p className="text-black font-lexend font-normal">¡Lo sentimos! No pudimos encontrar la página que estás buscando.</p>
               <p className="text-black font-lexend font-semibold mt-2">Oprime <Link to={'/'} className="underline text-blue-500 hover:text-blue-700">aquí</Link> para volver.</p>
            </div>
         </div>
      </>
   )
}

export default Notfound