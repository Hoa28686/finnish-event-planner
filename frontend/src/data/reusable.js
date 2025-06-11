import axios from "axios";
import { format, isSameDay } from "date-fns";

export const time = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const sameDay = isSameDay(start, end);
  const timeRange = sameDay
    ? ` ${format(start, "EEEE, MMM d")}, ${format(start, "HH:mm")} - ${format(
        end,
        "HH:mm"
      )}`
    : ` ${format(start, "EEEE, MMM d")}, ${format(start, "HH:mm")}\n- ${format(
        end,
        "EEEE, MMM d"
      )},  ${format(end, "HH:mm")}`;
  return timeRange;
};

// min(localTime) for dateTime-local input
export const localTime = () => {
  const now = new Date();
  const difToUTC = now.getTimezoneOffset();
  const local = now.getTime() - difToUTC * 60 * 1000;
  return new Date(local).toISOString().slice(0, 16);
};

// for map and weather
export const geoConvert = async (location) => {
  try {
    const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
    const apiUrl = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${location}&format=json&limit=1`;
    const res = await axios.get(apiUrl);
    const data = res.data;
    // console.log(data);

    const lat = data[0].lat;
    const lng = data[0].lon;
    return { lat, lng, geoError: null };
  } catch (e) {
    return { lat: null, lng: null, geoError: "No locations found." };
  }
};

export const categoryColors = {
  food: "#EF4444",
  technology: "#0EA5E9",
  wellness: "#10B981",
  market: "#F59E0B",
  music: "#8B5CF6",
  nature: "#166534",
  art: "#EC4899",
  wellness: "#6366F1",
  games: "#F97316",
};
