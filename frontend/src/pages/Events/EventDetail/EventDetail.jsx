import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./EventDetail.module.css";
import useAxios from "../../../hooks/useAxios";
import MapView from "./MapView";
import Weather from "./Weather";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { time } from "../../../data/reusable";
const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [geo, setGeo] = useState({});
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
    <div className={styles.eventDetail}>
      <div className={styles.sticky}>
        <h3>{event.title}</h3>
        <div className={styles.eventInfo}>
          <div className={styles.time}>
            <IoMdTime className={styles.timeIcon} />
            {event.start && <p>{time(event.start, event.end)}</p>}
          </div>
          <div className={styles.location}>
            <IoLocationOutline className={styles.locationIcon} />
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
        {event.image && (
          <img
            loading="lazy"
            src={event.image}
            alt="event image"
            className={styles.eventImage}
          />
        )}
        <h3 className={styles.detail}>Details</h3>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetail;
