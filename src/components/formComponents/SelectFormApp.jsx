import React from 'react';
import styled from 'styled-components';
import { useField  } from 'formik';

const SelectFormApp = ({ label, name, options, ...props }) => {
  const [field, meta] = useField(name);
  
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <StyledSelect
        id={name}
        {...field}
        {...props}
        error={meta.touched && meta.error}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {meta.touched && meta.error && (
        <ErrorMessage>{meta.error}</ErrorMessage>
      )}
    </div>
  );
}

export default SelectFormApp

const StyledSelect = styled.select.withConfig({
    shouldForwardProp: (prop) => prop !== 'error',
})`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({error}) => error ? '#ff0000' : '#ccc'};
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 15px;
`;