import {useEffect, useState} from 'react';
import ListServices, {
  AxiosResponse,
  AxiosError,
} from '../services/list-service';

interface OriginalDataItem {
  id: string;
  name: string;
  value: any;
}

export default () => {
  const [results, setResults] = useState<OriginalDataItem[]>([]); // Tipar results
  const [errorMessage, setErrorMessage] = useState<string>(''); // Tipar errorMessage

  const transformData = (originalData: Record<string, any>) => {
    return Object.entries(originalData).map(([key, value]) => ({
      id: key,
      name: key,
      value: value,
    }));
  };

  const searchApi = async () => {
    try {
      const response: AxiosResponse<{data: Record<string, any>}> =
        await ListServices.getData(); // Tipar la respuesta
      const transformedResults = transformData(response.data);
      setResults(transformedResults);
    } catch (error: AxiosError) {
      if (error.response) {
        // El servidor respondió con un código de estado que no está en el rango 2xx
        console.error('Request failed with status code', error.response.status);
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No response received from server');
      } else {
        // Algo sucedió en la configuración de la solicitud que provocó un error
        console.error('Error setting up the request:', error.message);
      }
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    searchApi();
  },[]);

  return [searchApi, results, errorMessage] as const; // Tipar el retorno
};
