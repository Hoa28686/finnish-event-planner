import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import EventCard from "../../components/EventCard/EventCard";
import styles from "./Calendar.module.css";
import { useEffect, useState } from "react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const EventCalendar = ({
  eventData,
  handleInfoChange,
  deleteEvent,
  deleteError,
  toggleFavorite,
  onAddCat,
  categories,
  handleMessage,
}) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");

  const [sameDayEvents, setSameDayEvents] = useState([]);

  const convertedEvents = eventData.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayEvents = convertedEvents.filter(
      (event) => event.start < tomorrow && event.end >= today
    );
    setSameDayEvents(todayEvents);
  }, [eventData]);

  const dayClickHandler = (slotInfo) => {
    const slotStart = slotInfo.start;
    const slotEnd = slotInfo.end;
    const matchEvents = convertedEvents.filter(
      (event) => event.start <= slotEnd && event.end >= slotStart
    );
    setSameDayEvents(matchEvents);
  };
  const eventClickHandler = (event) => {
    setSameDayEvents([event]);
  };
  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
      },
    };
  };
  return (
    <div className={styles.calendarContainer}>
      <h1>Event Schedule</h1>

      <Calendar
        localizer={localizer}
        events={convertedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: "32rem" }}
        date={date}
        view={view}
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        className={styles.calendar}
        selectable
        onSelectSlot={dayClickHandler}
        onSelectEvent={eventClickHandler}
        eventPropGetter={eventPropGetter}
      />
      {sameDayEvents.length > 0 ? (
        <div className={styles.eventList}>
          {sameDayEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              handleInfoChange={handleInfoChange}
              deleteEvent={deleteEvent}
              deleteError={deleteError}
              toggleFavorite={toggleFavorite}
              handleMessage={handleMessage}
              onAddCat={onAddCat}
              categories={categories}
            />
          ))}
        </div>
      ) : (
        <p>No events at this time</p>
      )}
    </div>
  );
};

export default EventCalendar;
