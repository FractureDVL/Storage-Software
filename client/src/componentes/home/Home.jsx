import Carousel from "./comp/Carousel"
import ListaCateg from "./comp/ListaCateg"
import ProductosCarousel from "./comp/Productos"
import Footer from "../Footer"

function Home() {
   return (
      <>
         <Carousel />
         <ListaCateg /> 
         <ProductosCarousel></ProductosCarousel>
         <Footer></Footer>
      </>
   )
}

export default Home