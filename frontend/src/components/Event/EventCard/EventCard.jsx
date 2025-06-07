import { useState } from "react";
import { geoConvert, localTime, time } from "../../../data/reusable";
import styles from "./EventCard.module.css";
import { Link } from "react-router";
import _ from "lodash";

import Weather from "./Weather";
import MapView from "./MapView";
const EventCard = ({
  id,
  title,
  start,
  end,
  location,
  image,
  lat,
  lng,
  isFavorite,
  description,
  category,
  handleInfoChange,
  deleteEvent,
  deleteError,
  toggleFavorite,
  handleMessage,
}) => {
  const [Editing, setEditing] = useState(false);
  const prevInfo = { title, start, end, location, description };
  const [newInfo, setNewInfo] = useState(prevInfo);
  const [showDetail, setShowDetail] = useState(false);

  const geo = [lat, lng];
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newInfo.title || !newInfo.start || !newInfo.end || !newInfo.location) {
      handleMessage("All fields are required.");
      return;
    }
    const { lat, lng, geoError } = await geoConvert(newInfo.location);
    if (geoError) {
      handleMessage(geoError);
      return;
    }

    const updatedInfo = { ...newInfo, lat, lng };

    handleInfoChange(id, updatedInfo);
    setEditing(false);
    handleMessage("Saved successfully!");
  };

  const isSaveDisabled = newInfo === "" || _.isEqual(newInfo, prevInfo);

  const handleCancel = () => {
    setNewInfo(prevInfo);
    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteEvent(id);
    if (deleteError) {
      handleMessage(deleteError.message);
      return;
    }
    handleMessage("Deleted successfully!");
  };

  return (
    <div className={styles.eventCard}>
      {image && (
        <img
          loading="lazy"
          src={image}
          alt="event image"
          className={styles.eventImage}
        />
      )}
      {Editing ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <input
            placeholder="Title"
            type="text"
            name="title"
            value={newInfo.title}
            onChange={handleChange}
            className={styles.input}
          />

          <div className={`${styles.input} ${styles.editTime}`}>
            <label>From</label>
            <input
              type="datetime-local"
              name="start"
              value={newInfo.start}
              onChange={handleChange}
              min={localTime()}
            />
          </div>

          <div className={`${styles.input} ${styles.editTime}`}>
            <label>To</label>
            <input
              type="datetime-local"
              name="end"
              value={newInfo.end}
              min={newInfo.start ? newInfo.start : localTime()}
              onChange={handleChange}
            />
          </div>

          <input
            placeholder="Location"
            type="text"
            name="location"
            value={newInfo.location}
            onChange={handleChange}
            className={styles.input}
          />

          <textarea
            placeholder="Description"
            type="text"
            name="description"
            value={newInfo.description}
            onChange={handleChange}
            className={`${styles.input} ${styles.textArea}`}
          />

          <div className={styles.eventCardFooter}>
            <button
              type="submit"
              disabled={isSaveDisabled}
              className={`
                  ${styles.button} + ${isSaveDisabled ? styles.disabled : ""}`}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.button}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles.favorite} onClick={() => toggleFavorite(id)}>
            {isFavorite ? "💖" : "🤍"}
          </div>
          <h3>{title}</h3>
          <p className={styles.category}>{category}</p>
          <div className={styles.time}>
            <label className={styles.timeIcon}>🕐</label>
            <p> {time(start, end)}</p>
          </div>
          <div className={styles.location}>
            <label className={styles.locationIcon}>📍</label>
            <p>{location}</p>
          </div>

          <Weather geo={geo} />
          <div className={styles.cardFooterBorder}></div>
          {showDetail ? (
            <>
              {description && (
                <>
                  <h4>Notes</h4>
                  <p>{description}</p>
                </>
              )}
              {geo.length === 2 && (
                <MapView geo={geo} title={title} location={location} />
              )}
              <div className={styles.eventCardFooter}>
                <button
                  onClick={() => setShowDetail(false)}
                  className={styles.button}
                >
                  Minimize
                </button>
                <button
                  onClick={() => setEditing(true)}
                  className={styles.button}
                >
                  Edit
                </button>
                <button onClick={handleDelete} className={styles.button}>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <div className={styles.eventCardFooter}>
              <button
                onClick={() => setShowDetail(true)}
                className={styles.button}
              >
                See more
              </button>
              <button
                onClick={() => setEditing(true)}
                className={styles.button}
              >
                Edit
              </button>
              <button onClick={handleDelete} className={styles.button}>
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventCard;
