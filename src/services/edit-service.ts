import API from '../helpers/api';

const EditServices = {
  updateData: (data: any) =>
    API.put('/v1/api-config/configs', data).then(response => {
      return response;
    }),
};

export default EditServices;
