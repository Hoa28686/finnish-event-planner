import styles from "./About.module.css";
import { FiLink } from "react-icons/fi";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Event Planner Application</h1>
      <div className="container">
        <p>
          This is a simple event planner app that allows users to create, view,
          and manage personal events. It was built using React and deployed via
          Render (backend) and Vercel (frontend).
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <FiLink /> Links and Live Page
          </h2>
          <ul>
            <li>
              <a
                className={styles.pageLink}
                href="https://finnish-event-planner.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Frontend
              </a>
            </li>
            <li>
              <a
                className={styles.pageLink}
                href="https://finnish-event-planner.onrender.com/events"
                target="_blank"
                rel="noopener noreferrer"
              >
                Backend (JSON Server API)
              </a>
            </li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📝 Key Features</h2>
          <ul className={styles.sectionList}>
            <li>Create, edit, and delete event with ease</li>
            <li>Search events by title, location or description</li>
            <li>Get current weather forecasts at each event location</li>
            <li>Upload image url to showcase events</li>
            <li>Dark and light mode</li>
            <li>Display all events in calendar and map</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🛠️ Technologies Used </h2>
          <ul className={styles.sectionList}>
            <li>React (with Hooks)</li>
            <li>React Router</li>
            <li>Axios (API calls)</li>
            <li>JSON Server</li>
            <li>Basic CSS and CSS Modules</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
