import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem("access_token");

    const validateToken = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/token/refresh/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ refresh: localStorage.getItem("refresh_token")})
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("access_token", data.access);
                return true;
            }
        } catch(error) {
            console.error("Token validation failed", error);
        }
        return false;
    };

    if (!token || !validateToken()) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;