import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css";
const Calendar = ({ events }) => {
  const dayContent = ({ date, view }) => {
    if (view === "month") {
      const found = events.find((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      });
      return found ? (
        <div className={styles.foundEvents}>
          <br />
          <span className={styles.eventTitle}>{found.title}</span>
        </div>
      ) : null;
    }
  };
  return (
    <div className="container">
      <ReactCalendar className={styles.calendar} tileContent={dayContent} />
    </div>
  );
};

export default Calendar;
