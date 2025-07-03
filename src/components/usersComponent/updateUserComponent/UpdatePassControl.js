import { useCallback } from 'react';

export const useUpdatePass = () =>{
    const updatePass = useCallback(async (data, onResponse) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://127.0.0.1:8000/api/user/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Error desconocido");
            }

            onResponse({ success: true, data: responseData });

        } catch (error) {
            console.error("Error en el fetch:", error);
            onResponse({ success: false, error: error.message });
        }
    }, []);

    return updatePass;

}