import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import EventCard from "../../components/Event/EventCard/EventCard";
import styles from "./Calendar.module.css";
import { categoryColors } from "../../data/reusable";
import { useState } from "react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EventCalendar = ({ eventData }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");

  const [sameDayEvents, setSameDayEvents] = useState([]);

  const dayClickHandler = (slotInfo) => {
    const slotStart = slotInfo.start;
    const slotEnd = slotInfo.end;
    const matchEvents = eventData.filter((event) => {
      const eventStart = event.start;
      const eventEnd = event.end;
      return eventStart <= slotEnd && eventEnd >= slotStart;
    });
    setSameDayEvents(matchEvents);
  };

  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: categoryColors[event.category] || "#0EA5E9",
      },
    };
  };
  return (
    <div className={styles.calendarContainer}>
      <h1>Event Schedule</h1>

      <Calendar
        localizer={localizer}
        events={eventData}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: "32rem" }}
        date={date}
        view={view}
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        className={styles.calendar}
        selectable
        onSelectEvent={dayClickHandler}
        eventPropGetter={eventPropGetter}
      />
      
      {sameDayEvents.length > 0 ? (
        sameDayEvents.map((event) => <EventCard key={event.id} {...event} />)
      ) : (
        <p>No events on this day</p>
      )}
    </div>
  );
};

export default EventCalendar;
