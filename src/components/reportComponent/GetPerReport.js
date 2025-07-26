import { useCallback } from "react";

export const useGetPermission = () => {
    const getPermReport = useCallback (async (userId, onResponse) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/permissionReport${userId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(errorBody.message || "Error al obtener los datos");
            }

            const data = await response.json();
            onResponse(data);
        } catch (error) {
            onResponse({ status: false, error: error.message });
        }
    }, []);

    return {getPermReport};
}