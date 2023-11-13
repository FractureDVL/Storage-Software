import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import AuthContextProvider from './contexts/AuthContext.jsx';
import ProductContextProvider from './contexts/ProductContext.jsx';
import { CartContextProvider } from './contexts/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
   <AuthContextProvider>
      <ProductContextProvider>
         <CartContextProvider>
            <App />
         </CartContextProvider>
      </ProductContextProvider>
   </AuthContextProvider>
)
