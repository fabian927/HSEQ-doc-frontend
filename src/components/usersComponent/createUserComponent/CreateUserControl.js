import React, {useEffect, useState} from 'react'

const CreateUserControl = ({ data, onResponse}) => {

  const handeLCreateUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/persons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });

      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }

      const responseData = await response.json(); 
      onResponse({ success: true, data: responseData }); 
    } catch (error) {
      onResponse({ success: false, error: error.message });
    }
  };

  useEffect(() => {
    if (typeof onResponse !== "function" || !data || Object.keys(data).length === 0 ) {
      return; 
    }
    handeLCreateUser();
  }, [data, onResponse]);
  
  return null;
}

export default CreateUserControl
