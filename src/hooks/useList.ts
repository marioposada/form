import {useEffect, useState} from 'react';

import ListServices from '../services/list-service';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const transformData = originalData => {
    return Object.entries(originalData).map(([key, value]) => ({
      id: key, // Usamos la clave como ID
      name: key,
      value: value,
    }));
  };

  const removeIdAndCreatedAt = obj => {
    const {id, created_at, ...rest} = obj;
    return rest;
  };

  const searchApi = async () => {
    try {
      const response = await ListServices.getData();
      const modifiedObject = removeIdAndCreatedAt(response.data);
      const transformedResults = transformData(modifiedObject);
      console.log('Datos para enviar a Screen', transformedResults);
      setResults(transformedResults);
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  return [searchApi, results, errorMessage];
};
