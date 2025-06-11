import { useState } from "react";
import { geoConvert, localTime, time } from "../../data/reusable";
import styles from "./EventCard.module.css";
import { Link } from "react-router";
import _ from "lodash";

import Weather from "./Weather";
import MapView from "./MapView";
import useCategory from "../../hooks/useCategory";
import EventEmoji from "../EventEmoji/EventEmoji";
const EventCard = ({
  id,
  title,
  emoji,
  color,
  category,
  start,
  end,
  location,
  image,
  lat,
  lng,
  isFavorite,
  description,
  categories,
  handleInfoChange,
  deleteEvent,
  deleteError,
  toggleFavorite,
  handleMessage,
  onAddCat,
}) => {
  const [Editing, setEditing] = useState(false);
  const prevInfo = {
    title,
    emoji,
    color,
    category,
    start,
    end,
    location,
    image,
    description,
  };
  const [newInfo, setNewInfo] = useState(prevInfo);
  const [showDetail, setShowDetail] = useState(false);

  const {
    addingCat,
    newCat,
    setNewCat,
    handleChange,
    handleAddCat,
    handleCatCancel,
    isAddDisabled,
  } = useCategory({
    categories,
    setUpdate: setNewInfo,
    onAddCat,
    handleMessage,
  });

  const geo = [lat, lng];

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
          <div className={`${styles.input} ${styles.titleContainer}`}>
            <input
              placeholder="Title"
              type="text"
              name="title"
              value={newInfo.title}
              onChange={handleChange}
              className={styles.title}
              required
            />
            <div className={styles.colorEmoji}>
              <EventEmoji
                name="emoji"
                value={newInfo.emoji}
                onChange={handleChange}
              />
              <input
                type="color"
                name="color"
                value={newInfo.color}
                onChange={handleChange}
                className={styles.color}
              />
            </div>
          </div>

          {addingCat ? (
            <>
              <input
                type="text"
                placeholder="Create category"
                name="newCat"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className={styles.input}
                required
              />
              <div className={styles.catBtns}>
                <button onClick={handleCatCancel} className={styles.catBtn}>
                  Cancel
                </button>
                <button
                  onClick={handleAddCat}
                  disabled={isAddDisabled}
                  className={`${styles.catBtn} ${
                    isAddDisabled ? styles.disabled : ""
                  }`}
                >
                  Add
                </button>
              </div>
            </>
          ) : (
            <div className={`${styles.input} ${styles.categories}`}>
              <label className={styles.label}>Category</label>
              <select
                name="category"
                onChange={handleChange}
                value={newInfo.category}
                className={styles.select}
              >
                {categories.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
                <option value="create">create new category</option>
              </select>
            </div>
          )}

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
          <input
            placeholder="Image url"
            type="text"
            name="image"
            value={newInfo.image}
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
          <h3>
            {title} {emoji}{" "}
            <span
              style={{ backgroundColor: color }}
              className={styles.eventColor}
            ></span>
          </h3>
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
