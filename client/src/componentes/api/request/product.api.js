import { backendAPI } from "../axiosBackend.api";
import endpoints from "../../../endpoints/Endpoints";

export const getProductosRequest = async () => backendAPI.get(endpoints.GET_PRODUCTOS);

export const getColeccionesRequest = async () => backendAPI.get(endpoints.GET_COLECCIONES);

export const getProductoRequest = async (data) => backendAPI.get(endpoints.LOGIN, data);

export const getCuponRequest = async (body) => backendAPI.post(endpoints.GET_CUPON, body);

export const pedidoRequest = async (body) => backendAPI.post(endpoints.PEDIDO, body);

export const getPedidosRequest = async () => backendAPI.get(endpoints.GET_PEDIDOS);

export const getCategoriesRequest = async () => backendAPI.get(endpoints.GET_CATEGORIES);
//TODO  change GET_BYCATEGORY
export const getProductsByCategories = async (body) => backendAPI.get(endpoints.GET_CATEGORIES, body);