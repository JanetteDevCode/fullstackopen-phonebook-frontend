import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  return (
    axios
      .get(baseUrl)
      .then((response) => {
        console.log('get all persons successful');
        console.log('response data', response.data);
        return response.data;
      })
      .catch((err) => {
        console.log('err response:', err.response);
        return Promise.reject(err.response);
      })
  );
};

const createPerson = (newPerson) => {
  return (
    axios
      .post(baseUrl, newPerson)
      .then((response) => {
        console.log('create person successful');
        console.log('response data', response.data);
        return response.data;
      })
      .catch((err) => {
        console.log('err response:', err.response);
        return Promise.reject(err.response);
      })
  );
};

const updatePerson = (editedPerson) => {
  return (
    axios
      .put(`${baseUrl}/${editedPerson.id}`, editedPerson)
      .then((response) => {
        console.log('update person successful');
        console.log('response data', response.data);
        return response.data;
      })
      .catch((err) => {
        console.log('err response:', err.response);
        return Promise.reject(err.response);
      })
  );
}

const deletePerson = (removablePerson) => {
  return (
    axios
      .delete(`${baseUrl}/${removablePerson.id}`)
      .then((response) => {
        console.log('delete person successful');
        console.log('response data', response.data);
        return response.data;
      })
      .catch((err) => {
        console.log('err response:', err.response);
        return Promise.reject(err.response);
      })
  );
};

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson
};