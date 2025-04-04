import React, {useEffect} from 'react'

const DeleteUserControl = ({user, onResponse}) => {

    const handleDelete = async (user) => {
        try {

            console.log( "userDelete desde control: ", user);
            
            if (!user) {
                console.log("no hay usuario para eliminar");
                return;
            }
    
            const response = await fetch(`http://127.0.0.1:8000/api/persons/${user}`, {
                method: "delete"
            });

            const textResponse = await response.text();
            const data = textResponse ? JSON.parse(textResponse) : {};

            if (!response.ok) {
                throw new Error(data.message || `Error HTTP: ${response.status}`);
            }

            if (onResponse) {
                onResponse(data);
            }

            return data;
            
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            if (onResponse) {
                onResponse({ 
                    succes: false,
                    error: error.message,
                });
            }
        }
    }

    useEffect(() =>{
        if (user) {    
          handleDelete(user);
        }
      }, [user]);


  return null;
}

export default DeleteUserControl
