import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { time } from "../../data/reusable";
import L from "leaflet";
import markerIcon from "../../../public/markerIcon.png";
import markerShadow from "../../../public/markerShadow.png";

const Map = ({ center, events, single = false }) => {
  if (!events || events.length === 0) {
    return <p className={styles.loading}>Loading map.....</p>;
  }

  const customIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [30, 30],
    shadowSize: [30, 30],
    iconAnchor: [15, 30],
    shadowAnchor: [10, 30],
    popupAnchor: [0, -30],
  });
  const mapSize = single === true ? styles.mapOne : styles.mapAll;
  return (
    <MapContainer center={center} zoom={13} className={mapSize}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {single ? (
        <Marker position={center} icon={customIcon}>
          <Popup>
            <h3>{events.title}</h3>
            <p>{events.location}</p>
          </Popup>
        </Marker>
      ) : (
        events.map((event) => (
          <Marker
            position={[event.lat, event.lng]}
            key={event.id}
            icon={customIcon}
          >
            <Popup>
              <h3>
                {event.title} {event.emoji}
              </h3>
              <p>📍 {event.location}</p>
              <p>{time(event.start, event.end)} </p>
            </Popup>
          </Marker>
        ))
      )}
    </MapContainer>
  );
};

export default Map;
