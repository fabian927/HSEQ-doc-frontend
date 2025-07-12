import { useCallback } from "react";

export const usePartInspectionSubmit = () => {
    const partInspectionSubmit = useCallback(async (data, onResponse) => {

    console.log('data desde hook ', data);
        
        try {
            const response = await fetch("http://127.0.0.1:8000/api/respInspectionHerrManuales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if (responseData.status === 422) {
                throw new Error("Error en la validacion de información en el servidor");                
            }else{
                onResponse({success: true, data: responseData});
            }
            
        } catch (error) {
            console.log('Error en el fetch', error);
            onResponse({success: false, error: error.merrage});
        }

    }, []);

    return partInspectionSubmit;
}