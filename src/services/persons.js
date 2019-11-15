import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return (
    axios
      .get(baseUrl)
      .then((response) => {
        console.log('get all persons successful');
        console.log('response data', response.data);
        return response.data;
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
  );
};

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson
};