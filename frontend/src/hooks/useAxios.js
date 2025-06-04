import axios from "axios";
import { useState } from "react";
const useAxios = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const get = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
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
  const remove = async (url, id) => {
    try {
      const res = await axios.delete(`${url}/${id}`);
      return res.data;
    } catch (e) {
      setError(e);
    }
  };

  return { get, post, patch, remove, loading, error };
};

export default useAxios;
