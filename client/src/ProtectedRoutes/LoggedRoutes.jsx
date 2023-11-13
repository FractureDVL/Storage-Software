import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoggedRoutes() {
   const { loading, isAuthenticated } = useAuth();

   if (loading) {
      return <h1>Cargando...</h1>
   }
   if (!isAuthenticated) return <Navigate to='/login' replace />

   return (
      <Outlet />
   )
}

export default LoggedRoutes