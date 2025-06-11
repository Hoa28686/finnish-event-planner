import styles from "./MapAll.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { time } from "../../data/reusable";
import L from "leaflet";
import markerIcon from "../../../public/markerIcon.png";

const MapAll = ({ eventData }) => {
  if (!eventData || eventData.length === 0) {
    return <p class={styles.loading}>Loading map.....</p>;
  }
  const geo = [eventData[0].lat, eventData[0].lng];
  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
  return (
    <MapContainer center={geo} zoom={13} className={styles.mapView}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {eventData.map((event) => (
        <Marker
          position={[event.lat, event.lng]}
          key={event.id}
          icon={customIcon}
        >
          <Popup>
            <h3>{event.title}</h3>
            <p>📍 {event.location}</p>
            <p> {time(event.start, event.end)}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapAll;
