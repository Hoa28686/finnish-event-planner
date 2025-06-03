import EventCard from "../../../components/Event/EventCard/EventCard";
import CategoryCard from "../../../components/Event/CategoryCard/CategoryCard";
import "./EventList.css";
const EventList = ({ eventData }) => {
  return (
    <>
      <h1>Event Category</h1>
      <div className="eventCategory">
        {eventData.map((event) => (
          <CategoryCard key={event.id} category={event.category} />
        ))}
      </div>
      <h1>EventList</h1>
      <div>
        {eventData.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </>
  );
};

export default EventList;
