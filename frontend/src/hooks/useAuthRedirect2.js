import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

 export const useAuthRedirect2 = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
       
    }, [navigate]);
};
