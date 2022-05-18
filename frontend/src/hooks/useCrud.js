import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCrud(baseUrl, initialState = null, idProp = '_id') {
  const [data, setData] = useState(initialState);

  // Load all data when we first use this hook, or whenever we change the url or re-fetch.
  useEffect(() => {
    axios
      .get(`${baseUrl}/get/000000000000000000000008`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {});
  }, [baseUrl]);

  /**
   * Update the given item. If successful, update the corresponding item
   * in the "data" state above.
   *
   * Alternatively we could pre-emptively update the "data" state to re-render
   * with the new data, then roll it back if the server-side update fails.
   */
  function update(item) {
    return axios
      .put(`${baseUrl}/set/${item[idProp]}`, item)
      .then((response) => {
        setData(item);
      })
      .catch((err) => {});
  }

  return { data, update };
}
