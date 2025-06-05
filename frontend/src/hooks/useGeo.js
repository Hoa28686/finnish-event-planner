import { useState } from "react";
import useAxios from "../hooks/useAxios";

const useGeo = () => {
  const [geoError, setGeoError] = useState(null);
  const { get } = useAxios();

  const geoConvert = async (location) => {
    try {
      const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
      const apiUrl = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${location}&format=json&limit=1`;
      const data = await get(apiUrl);

      if (!data || data.length === 0) {
        throw new Error("Location not found.");
      }
      return { lat: data[0].lat, lng: data[0].lon };
    } catch (e) {
      setGeoError(e);
      return;
    }
  };
  return { geoConvert, geoError };
};
export default useGeo;
 