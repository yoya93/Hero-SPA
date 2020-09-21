import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};

// esto solo se encarga de ir recogiendo los valores en el input
//y los va devolviendo em values y la function handleInputChange se coloca
//en el onchange del input
//el reset se coloca despues ke se realiza el submit en el componente padre

// const initialForm = {
//     name: "",
//   };
// const [formValues, handleInputChange, reset] = useForm(initialForm);
// const { name } = formValues;

// ese name se coloca en el value del input
