import EventCard from "../../../components/Event/EventCard/EventCard";
import CategoryCard from "../../../components/Event/CategoryCard/CategoryCard";
import styles from "./EventList.module.css";
const EventList = ({
  eventData,
  handleInfoChange,
  error,
  loading,
  deleteEvent,deleteError
}) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <h1>Loading......</h1>
        <h2>It might take a little while</h2>
      </div>
    );
  }
  if (error) return <h1 className={styles.error}>Error: {error.message}</h1>;

  return (
    <>
      <h1>Event Category</h1>
      <div className={styles.eventCategory}>
        {eventData.map((event) => (
          <CategoryCard key={event.id} category={event.category} />
        ))}
      </div>
      <h1>EventList</h1>
      <div>
        {eventData.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            handleInfoChange={handleInfoChange}
            deleteEvent={deleteEvent}
            deleteError={deleteError}
          />
        ))}
      </div>
    </>
  );
};

export default EventList;
