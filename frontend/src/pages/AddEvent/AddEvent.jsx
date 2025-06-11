import { useEffect, useState } from "react";
import styles from "./AddEvent.module.css";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";
import { geoConvert, localTime } from "../../data/reusable";
import useCategory from "../../hooks/useCategory";
import EventEmoji from "../../components/EventEmoji/EventEmoji";

const emptyForm = {
  title: "",
  start: "",
  end: "",
  location: "",
  description: "",
  image: "",
  category: "others",
  color: "#0EA5E9",
  emoji: "",
};
const AddEvent = ({
  eventApi,
  onAddEvent,
  categories,
  onAddCat,
  handleMessage,
  message,
}) => {
  const [formData, setFormData] = useState(emptyForm);
  const { post, error: postError } = useAxios();

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
    setUpdate: setFormData,
    onAddCat,
    handleMessage,
  });

  const navigate = useNavigate();
  console.log(formData.emoji);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { lat, lng, geoError } = await geoConvert(formData.location);
    if (geoError) {
      handleMessage(geoError);
      return;
    }
    const newEvent = {
      ...formData,
      id: Date.now().toString(),
      lat: lat,
      lng: lng,
      isFavorite: false,
    };
    // console.log(newEvent);

    const addedEvent = await post(eventApi, newEvent);
    if (postError) {
      handleMessage(postError.message);
      return;
    }

    onAddEvent(addedEvent);
    setFormData(emptyForm);
    navigate("/");
  };

  return (
    <>
      <h1>Add new event</h1>
      <form onSubmit={handleSubmit} className={styles.addForm}>
        <div className={`${styles.input} ${styles.titleContainer}`}>
          <input
            placeholder="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.title}
            required
          />
          <div className={styles.colorEmoji}>
            <EventEmoji
              name="emoji"
              value={formData.emoji}
              onChange={handleChange}
            />
            <input
              type="color"
              name="color"
              value={formData.color}
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
              value={formData.category}
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
        <div className={`${styles.input} ${styles.time}`}>
          <label>From</label>
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className={styles.start}
            min={localTime()}
            required
          />
        </div>

        <div className={`${styles.input} ${styles.time}`}>
          <label>To</label>
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleChange}
            className={styles.end}
            min={formData.start ? formData.start : localTime()}
            required
          />
        </div>

        <input
          placeholder="Location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          placeholder="Image url"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className={styles.input}
        />

        <textarea
          placeholder="Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`${styles.input} ${styles.textArea}`}
        />

        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
      {message && <p className={styles.error}>{message}</p>}
    </>
  );
};

export default AddEvent;
