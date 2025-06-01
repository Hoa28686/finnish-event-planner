import "./EventCard.css";
import { weekdays } from "../../../data/data";
import { Link } from "react-router";

const EventCard = ({ id, title, date, location }) => {
  const dayIndex = new Date(date).getDay();

  return (
    <div className="eventCard">
      <h3>{title}</h3>
      <p>
        {weekdays[dayIndex]}, {date}
      </p>
      <p>{location}</p>
      <div className="eventCardFooter">
        <Link to={`/${id}`}>See more</Link>
      </div>
    </div>
  );
};

export default EventCard;
