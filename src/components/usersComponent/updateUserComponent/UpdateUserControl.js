import React, { useCallback, useEffect } from 'react'
import { Last } from 'react-bootstrap/esm/PageItem';

const UpdateUserControl = ({user, onResponse}) => {

const handleUpdate = async (userUpdt) => {
  try {
    
    console.log("user desde handle ", userUpdt);
    console.log("id desde handle ", userUpdt.id);
    if (!userUpdt || !userUpdt.id) {
      console.error("No hay usuario o ID para actualizar");
      return;
    }

    const response = await fetch(`http://127.0.0.1:8000/api/persons/${userUpdt.id}`, {
      method: "PATCH",
      headers: {
       "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdt),
    });
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (onResponse) {
      onResponse(data);
    }

    return data;

  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    if (onResponse) {
      onResponse({ error: error.message });
    }
  }
}

  useEffect(() =>{
    if (user) {

      const userUpdt = {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        doc_type: user.doc_type,
        document: user.document,
        email: user.email,
        phone: user.phone,
        address: user.address,
        birthdate: user.birthdate,
        age: user.age,
      };

      handleUpdate(userUpdt);
    }
  }, [user]);

  return null;
}

export default UpdateUserControl
