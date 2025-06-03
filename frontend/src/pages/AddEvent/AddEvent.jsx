import { useState } from "react";
import styles from "./AddEvent.module.css";

const emptyForm = {
  title: "",
  start: "",
  end: "",
  location: "",
  description: "",
  imageUrl: "",
};
const AddEvent = () => {
  const [formdata, setFormData] = useState(emptyForm);
  return (
    <>
      <h1>Add new event</h1>
      <form onSubmit={handleSubmit} className={`${styles.addForm}`}>
        <div className={styles.addFormRow}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="salary" className={styles.label}>
            Salary:
          </label>
          <input
            id="salary"
            type="number"
            step="any"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="phone" className={styles.label}>
            Phone:
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="animal" className={styles.label}>
            Animal:
          </label>
          <input
            id="animal"
            type="text"
            name="animal"
            value={formData.animal}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="startDate" className={styles.label}>
            Start date:
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="location" className={styles.label}>
            Location:
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="department" className={styles.label}>
            Department:
          </label>
          <input
            id="department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.addFormRow}>
          <label htmlFor="skills" className={styles.label}>
            Skills:
          </label>
          <input
            id="skills"
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>
    </>
  );
};

export default AddEvent;
