import { useState } from "react";
import styles from "./AddEvent.module.css";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";

const emptyForm = {
  title: "",
  start: "",
  end: "",
  location: "",
  description: "",
  image: "",
  category: "other",
};
const AddEvent = ({ eventApi, onAddEvent }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [timeError, setTimeError] = useState("");
  const { get, error: getError } = useAxios();
  const { post, error: postError } = useAxios();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const geoConvert = async (location) => {
    const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
    const apiUrl = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${location}&format=json&limit=1`;
    const data = await get(apiUrl);
    if (getError) {
      console.error("Geocode error: ", getError.message);
      return;
    }
    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon);
    return { lat, lng };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const start = new Date(formData.start);
    const end = new Date(formData.end);
    if (start < now || start >= end) {
      setTimeError(
        "Start time must be in the future, and end time must be after start time. "
      );
      // setFormData(emptyForm);
      return;
    }

    const { lat, lng } = await geoConvert(formData.location);
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
      console.error(postError.message);
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
        <input
          placeholder="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <div className={`${styles.input} ${styles.time}`}>
          <label>From</label>
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleChange}
            className={styles.start}
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
        {/* <select name="category" >Category</select>

        <input
          placeholder="Category"
          type="text"
          
          value={formData.category}
          onChange={handleChange}
          className={styles.input}
          
        />
         */}

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
        {timeError && <p className={styles.error}>{timeError}</p>}
      </form>
    </>
  );
};

export default AddEvent;
