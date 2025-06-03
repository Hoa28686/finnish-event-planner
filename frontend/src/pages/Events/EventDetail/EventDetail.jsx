import { useEffect, useState } from "react";
import { useParams } from "react-router";

import useAxios from "../../../hooks/useAxios";
import "./EventDetail.css";
import MapView from "./MapView";
import Weather from "./Weather";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { time } from "../../../data/reusable";
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

  return (
    <div className="container eventDetail">
      <div className="sticky">
        <div className="eventInfo">
          <h3>{event.title}</h3>
          <div className="time">
            <IoMdTime className="timeIcon" />
            {event.start && <p>{time(event.start, event.end)}</p>}
          </div>
          <div className="location">
            <IoLocationOutline className="locationIcon" />
            <p>{event.location}</p>
          </div>
        </div>
        {/* weather */}
        <h4>Current weather</h4>
        <Weather geo={geo} />
        {/* map view */}
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
