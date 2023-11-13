import { backendAPI } from "../axiosBackend.api";
import endpoints from "../../../endpoints/Endpoints";

export const loginRequest = async (data) => backendAPI.post(endpoints.LOGIN, data);

export const editUserRequest = async (data) => backendAPI.put(endpoints.EDIT_USER, data);

export const registerRequest = async (data) => backendAPI.post(endpoints.REGISTER, data);

export const getUsuarioRequest = async () => backendAPI.get(endpoints.GET_USER);

export const getAboutUsRequest = async () => backendAPI.get(endpoints.GET_ABOUTUS);