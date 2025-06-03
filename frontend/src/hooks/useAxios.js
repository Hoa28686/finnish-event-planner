import axios from "axios";
import { useState } from "react";
const useAxios = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const get = async (url) => {
    try {
      const res = await axios.get(url);
      let data = res.data;
      if (Array.isArray(data)) {
        data = data.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));
      } else {
        data.start = new Date(data.start);
        data.end = new Date(data.end);
      }
      return data;
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const post = async (url, newData) => {
    try {
      const res = await axios.post(url, newData);
      return res.data;
    } catch (e) {
      setError(e);
    }
  };
  const patch = async (url, id, newData) => {
    try {
      const res = await axios.patch(`${url}/${id}`, newData);
      return res.data;
    } catch (e) {
      setError(e);
    }
  };

  return { get, post, patch, loading, error };
};

export default useAxios;
