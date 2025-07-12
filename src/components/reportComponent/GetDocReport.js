import { useCallback } from "react";

export const useGetDocuments = () => {
    const getDocumentsReports = useCallback(async (userId, onResponse) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/inspectionHerrManuales${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error("Error al obtener la información: ", error.message);
                
            }else{
                const data = await response.json();
                onResponse(data);
            }
            
        } catch (error) {
            onResponse({status: false, error: error.message});
        }
    },[]);

    return {getDocumentsReports};
}