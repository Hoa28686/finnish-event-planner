import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./pages/Root";
import About from "./pages/About/About";
import EventList from "./pages/EventList/EventList";
import AddEvent from "./pages/AddEvent/AddEvent";
import EventCalendar from "./pages/Calendar/Calendar";
import useAxios from "./hooks/useAxios";
import MapAll from "./pages/MapAll/MapAll";

function App() {
  const [eventData, setEventData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { get, patch, loading, error } = useAxios();
  const { remove, error: deleteError } = useAxios();
  const [message, setMessage] = useState("");

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  // const eventApi = "https://finnish-event-planner.onrender.com/events";
  const eventApi = "http://localhost:3002/events";

  useEffect(() => {
    const fetchData = async () => {
      let data = await get(eventApi);
      setCategories([...new Set(data.map((e) => e.category))]);
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

  const onAddCat = (newCat) => {
    if (!categories.includes(newCat)) {
      setCategories((prev) => [...prev, newCat]);
    }
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
                  categories={categories}
                  error={error}
                  loading={loading}
                  handleInfoChange={handleInfoChange}
                  deleteEvent={deleteEvent}
                  deleteError={deleteError}
                  toggleFavorite={toggleFavorite}
                  onAddCat={onAddCat}
                  message={message}
                  handleMessage={handleMessage}
                />
              }
            />
            {/* <Route path="/:id" element={<EventDetail />} /> */}
            <Route
              path="/add-event"
              element={
                <AddEvent
                  categories={categories}
                  onAddCat={onAddCat}
                  eventApi={eventApi}
                  onAddEvent={addEvent}
                  message={message}
                  handleMessage={handleMessage}
                />
              }
            />
            <Route
              path="/calendar"
              element={
                <EventCalendar
                  eventData={eventData}
                  categories={categories}
                  handleInfoChange={handleInfoChange}
                  deleteEvent={deleteEvent}
                  deleteError={deleteError}
                  toggleFavorite={toggleFavorite}
                  handleMessage={handleMessage}
                  onAddCat={onAddCat}
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
