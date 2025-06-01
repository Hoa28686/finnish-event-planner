import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./EventDetail.css";

const MapView = ({ geo, title, location }) => {
  return (
    <MapContainer center={geo} zoom={13} className="mapView">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
