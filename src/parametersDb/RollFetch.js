import React, { useEffect } from "react";

const RollApp = ({onResponse}) => {

  const fetchAllRolls = async () => {
    try {

        const response = await fetch('http://127.0.0.1:8000/api/roll', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener los roles");
        }

        const data = await response.json();
        
        onResponse({ success: true, data });

    } catch (error) {
        onResponse({ success: false, error: error.message });
    }
  };

  useEffect(() => {

    if (typeof onResponse !== "function") return;
    
    fetchAllRolls();
      
  }, [onResponse]);
    
  return null;
}

export default RollApp
