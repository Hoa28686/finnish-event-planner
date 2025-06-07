import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./pages/Root";
import About from "./pages/About/About";
import EventList from "./pages/Events/EventList/EventList";
import AddEvent from "./pages/AddEvent/AddEvent";
import EventCalendar from "./pages/Calendar/Calendar";
import useAxios from "./hooks/useAxios";
import EventDetail from "./pages/Events/EventDetail/EventDetail";
import MapAll from "./pages/Map/MapAll";

function App() {
  const [eventData, setEventData] = useState([]);

  const { get, patch, loading, error } = useAxios();
  const { remove, error: deleteError } = useAxios();
  const eventApi = "http://localhost:3001/events";

  useEffect(() => {
    const fetchData = async () => {
      let data = await get(eventApi);
      setEventData(data);
    };
    fetchData();
  }, []);

  const addEvent = (newEvent) => {
    setEventData((prev) => [...prev, newEvent]);
  };

  const handleInfoChange = async (id, newInfo) => {
    const updatedInfo = await patch(eventApi, id, newInfo);
    setEventData((prev) =>
      prev.map((event) => (event.id === id ? updatedInfo : event))
    );
  };

  const deleteEvent = async (id) => {
    await remove(eventApi, id);
    setEventData((prev) => prev.filter((event) => event.id !== id));
  };
  const toggleFavorite = async (id) => {
    const event = eventData.find((e) => e.id === id);
    const updatedFavorite = { ...event, isFavorite: !event.isFavorite };
    const updatedEvent = await patch(eventApi, id, updatedFavorite);
    setEventData((prev) =>
      prev.map((event) => (event.id === id ? updatedEvent : event))
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route
              index
              element={
                <EventList
                  eventData={eventData}
                  error={error}
                  loading={loading}
                  handleInfoChange={handleInfoChange}
                  deleteEvent={deleteEvent}
                  deleteError={deleteError}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="/:id" element={<EventDetail />} />
            <Route
              path="/add-event"
              element={<AddEvent eventApi={eventApi} onAddEvent={addEvent} />}
            />
            <Route
              path="/calendar"
              element={
                <EventCalendar
                  eventData={eventData}
                  handleInfoChange={handleInfoChange}
                  deleteEvent={deleteEvent}
                  deleteError={deleteError}
                  toggleFavorite={toggleFavorite}
                />
              }
            />
            <Route path="/map" element={<MapAll eventData={eventData} />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
