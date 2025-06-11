import Map from "../../components/Map/Map";

const MapAll = ({ eventData }) => {
  if (!eventData || eventData.length === 0) {
    return <p style={{ textAlign: "center" }}>Loading map.....</p>;
  }
  return (
    <Map center={[eventData[0].lat, eventData[0].lng]} events={eventData} />
  );
};

export default MapAll;
