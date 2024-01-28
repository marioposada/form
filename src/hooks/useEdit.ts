import { useState} from 'react';

import EditServices from '../services/edit-service';

export default () => {
  const [resultsEdit, setResultsEdit] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const editApi = async () => {
    try {
      const response = await EditServices.updateData();
      setResultsEdit(response);
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };


  return [editApi, resultsEdit, errorMessage];
};