const endpoints = {
   // API_BACKEND: 'http://127.0.0.1:8000/api/',
   API_BACKEND: 'http://192.168.1.32:8000/api/',
   REGISTER: 'auth/register/',
   LOGIN: 'auth/token/',
   REFRESH: 'auth/token/refresh/',
   GET_USER: 'user/',
   EDIT_USER: 'auth/update/',
   GET_PRODUCTOS: 'product/',
   PEDIDO: 'pedido/agregar-producto/',
   GET_PEDIDOS: 'pedido/mis-pedidos/',
   GET_COLECCIONES: 'colecciones/',
   GET_CUPON: 'cupon/validar-cupon/',
   GET_ABOUTUS: 'nosotros/',
   GET_CATEGORIES: 'categoria/',
};

export default endpoints