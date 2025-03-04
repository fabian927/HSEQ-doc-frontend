import { useCallback } from "react";

const useValidateObject = () => {

  const isValidObject = useCallback((obj) => {
    
    if (!obj || typeof obj !== "object") return false; 
    
    return Object.values(obj).every(value => value !== null && value !== undefined && value !== "");

  }, []);

  return { isValidObject };
};

export default useValidateObject;
