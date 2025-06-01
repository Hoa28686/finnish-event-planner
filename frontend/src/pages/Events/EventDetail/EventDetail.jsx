import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { weekdays } from "../../../data/data";
import useAxios from "../../../hooks/useAxios";
import "./EventDetail.css";
import MapView from "./MapView";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [geo, setGeo] = useState([]);
  const { get } = useAxios();
  useEffect(() => {
    const fetchData = async () => {
      const data = await get(`http://localhost:3001/events/${id}`);
      setEvent(data);
      setGeo([data.lat, data.lng]);
    };
    fetchData();
  }, [id]);

  const dayIndex = new Date(event.date).getDay();

  return (
    <div className="container eventDetail">
      <div className="sticky">
        <div className="eventInfo">
          <h3>{event.title}</h3>
          <p>
            {weekdays[dayIndex]}, {event.date}
          </p>
          <p>{event.location}</p>
        </div>

        {geo.length === 2 && (
          <MapView geo={geo} title={event.title} location={event.location} />
        )}
      </div>
      <div>
        <img
          loading="lazy"
          src={event.image}
          alt="event image"
          className="eventImage"
        />
        <h3>Details</h3>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetail;
