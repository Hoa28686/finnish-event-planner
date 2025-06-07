import EventCard from "../../../components/Event/EventCard/EventCard";
import styles from "./EventList.module.css";
import { useState } from "react";
const EventList = ({
  eventData,
  error,
  loading,
  handleInfoChange,
  deleteEvent,
  deleteError,
  toggleFavorite,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [catFilter, setCatFilter] = useState("all categories");
  const [favFilter, setFavFilter] = useState(false);
  const [message, setMessage] = useState("");
  const categories = [
    "all categories",
    ...new Set(eventData.map((e) => e.category)),
  ];

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const searchHandle = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredEventData = eventData.filter((event) => {
    const search = searchValue.toLowerCase();
    const matchedSearch =
      event.title.toLowerCase().includes(search) ||
      event.description.toLowerCase().includes(search);
    const matchedFavorite = favFilter ? event.isFavorite : true;
    const matchedCategory =
      catFilter === "all categories" ? true : event.category === catFilter;
    return matchedSearch && matchedFavorite && matchedCategory;
  });
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
      {message && <p className={styles.success}>{message}</p>}
      <div className={styles.filterContainer}>
        <input
          className={styles.search}
          type="text"
          placeholder="🔍 Search....."
          value={searchValue}
          onChange={searchHandle}
        />
        <div className={styles.select}>
          <select
            value={catFilter}
            className={styles.catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            {categories.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>

          <div className={styles.favFilter}>
            <input
              type="checkbox"
              id="favorite"
              checked={favFilter}
              onChange={() => setFavFilter((prev) => !prev)}
            />
            <label htmlFor="favorites"> Favorites</label>
          </div>
        </div>
      </div>

      <h1>EventList</h1>
      <div className={styles.listContainer}>
        {filteredEventData.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            handleInfoChange={handleInfoChange}
            deleteEvent={deleteEvent}
            deleteError={deleteError}
            toggleFavorite={toggleFavorite}
            handleMessage={handleMessage}
          />
        ))}
      </div>
    </>
  );
};

export default EventList;
