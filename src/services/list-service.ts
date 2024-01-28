import API from '../helpers/api';

const ListServices = {
  getData: () =>
    API.get('/v1/api-config/configs').then(response => {
      return response;
    }),
};

export default ListServices;
