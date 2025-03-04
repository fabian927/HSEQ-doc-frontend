import React, {useEffect} from 'react'

const FilterUserControl = ({ dataFilter = {}, onResponse }) => {
  const { type, doc } = dataFilter || {}; 

  const fetchAllPersons = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/persons', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener todas las personas");
        }

        const data = await response.json();
        onResponse({ success: true, data });
    } catch (error) {
        onResponse({ success: false, error: error.message });
    }
  };

  const fetchPersonByDoc = async () => {
      try {
          if (!doc) {
              throw new Error("Documento no proporcionado");
          }

          const response = await fetch(`http://127.0.0.1:8000/api/persons/${doc}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });

          if (!response.ok) {
              throw new Error("Usuario Inválido");
          }

          const data = await response.json();
          onResponse({ success: true, data });
      } catch (error) {
          onResponse({ success: false, error: error.message });
      }
  };

  useEffect(() => {
      if (typeof onResponse !== "function") return;
        if (type === '1') {
            fetchAllPersons();
        } else if (type === '2') {
            fetchPersonByDoc();
      } 
  }, [type, doc, onResponse]);

  return null;
};


export default FilterUserControl
