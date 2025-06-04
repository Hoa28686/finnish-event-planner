import useAxios from "../hooks/useAxios";

const useGeo = () => {
  const { get, error: getError } = useAxios();

  const geoConvert = async (location) => {
    const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
    const apiUrl = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${location}&format=json&limit=1`;
    const data = await get(apiUrl);
    if (getError) {
      console.error("Geocode error: ", getError.message);
      return;
    }

    const lat = data[0].lat;
    const lng = data[0].lon;
    return { lat, lng };
  };
  return { geoConvert };
};
export default useGeo;
