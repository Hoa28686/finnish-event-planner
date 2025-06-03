import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Root from "./pages/Root";
import About from "./pages/About/About";
import EventList from "./pages/Events/EventList/EventList";
import AddEvent from "./pages/AddEvent/AddEvent";
import Calendar from "./pages/Calendar/Calendar";
import useAxios from "./hooks/useAxios";
import EventDetail from "./pages/Events/EventDetail/EventDetail";
import EventCalendar from "./pages/Calendar/Calendar";

function App() {
  const [eventData, setEventData] = useState([]);
  const eventApi = "http://localhost:3001/events";
  const { get, post, patch, loading, error } = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      let data = await get(eventApi);
      setEventData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<EventList eventData={eventData} />} />
            <Route path="/:id" element={<EventDetail />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route
              path="/calendar"
              element={<EventCalendar eventData={eventData} />}
            />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
