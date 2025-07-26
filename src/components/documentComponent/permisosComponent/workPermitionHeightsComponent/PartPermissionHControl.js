import { useCallback } from "react";

export const usePartPermissionHControl = () => {
    const partPermissionSubmit = useCallback(async (data, onResponse) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/partPermissionHeights", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (responseData.status === 422) {
                throw new Error("Error en la validacion de informacion en el servidor");                
            }else if(responseData.status === 201) {
                onResponse({ success: true, data: responseData });
            }             
            
        } catch (error) {
            console.error("error en el fetch ", error.message);            
            onResponse({ success: false, error: error.message });
        }
    },[]);

    return partPermissionSubmit;
}