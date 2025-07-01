import { useCallback } from 'react';

export const useParticipantesSubmit = () => {
  const partSubmit = useCallback(async (data, onResponse) => {

    console.log('data desde hook ', data);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/participantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.status === 422) {
        throw new Error("Error en la validacion de informacion del servidor");
      }else if(responseData.status === 201){
        onResponse({ success: true, data: responseData });
      }

    } catch (error) {
      console.error("Error en el fetch:", error);
      onResponse({ success: false, error: error.message });
    }
  }, []);

  return partSubmit;
};