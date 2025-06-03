import { time } from "../../../data/reusable";
import "./EventCard.css";
import { Link } from "react-router";

const EventCard = ({ id, title, start, end, location }) => {
  return (
    <div className="eventCard">
      <h3>{title}</h3>
      <div className="time">
        <p className="timeIcon">🕐</p>
        <p> {time(start, end)}</p>
      </div>
      <div className="location">
        <p className="locationIcon" >📍</p>
        <p>{location}</p>
      </div>
      <div className="eventCardFooter">
        <Link to={`/${id}`}>See more</Link>
      </div>
    </div>
  );
};

export default EventCard;
