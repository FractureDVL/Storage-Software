import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Carousel() {
   const imgCarousel = [
      { key: 1, url: '/img/Carousel_1.jpeg' },
      { key: 2, url: '/img/Carousel_2.jpeg' },
      { key: 3, url: '/img/Carousel_3.jpeg' },
      { key: 4, url: '/img/Carousel_4.jpeg' },
   ]

   return (
      <OwlCarousel className='owl-theme' items={1} autoplay loop nav dots={false}>
         {imgCarousel.map((item) => (
            <div className='item' key={item.key}>
               <img src={item.url} alt={`Item ${item.key}`} />
            </div>
         ))}
      </OwlCarousel>
   )
}

export default Carousel