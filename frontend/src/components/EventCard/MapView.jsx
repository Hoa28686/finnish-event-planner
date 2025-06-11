import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import styles from "./EventCard.module.css";

const MapView = ({ geo, title, location }) => {
  const customMarkerIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
  });
  return (
    <MapContainer center={geo} zoom={13} className={styles.mapView}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={geo} icon={customMarkerIcon}>
        <Popup>
          <h3>{title}</h3>
          <p>{location}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
