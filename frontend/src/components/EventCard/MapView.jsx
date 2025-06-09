import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./EventCard.module.css";

const MapView = ({ geo, title, location }) => {
  return (
    <MapContainer center={geo} zoom={13} className={styles.mapView}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={geo}>
        <Popup>
          <h3>{title}</h3>
          <p>{location}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
