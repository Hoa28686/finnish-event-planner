import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import styles from "./Calendar.module.css";
import { categoryColors } from "../../data/data";
const localizer = momentLocalizer(moment);

const EventCalendar = ({ eventData }) => {
  
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={eventData}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className={styles.calendar}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: categoryColors[event.category] || "#0EA5E9",
          },
        })}
      />
    </div>
  );
};

export default EventCalendar;
