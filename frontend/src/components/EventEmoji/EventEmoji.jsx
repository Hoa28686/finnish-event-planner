import { useState } from "react";
import styles from "./EventEmoji.module.css";
import { emojiGroups } from "./emojis";

const EventEmoji = ({ name, value, onChange }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [selected, setSelected] = useState(["😃", false]);
  const [activeCat, setActiveCat] = useState("face");
  const handleSelectEmoji = (emoji) => {
    onChange({ target: { name, value: emoji } });
    setShowEmoji(false);
    setSelected([emoji, true]);
  };
  const handleNoEmoji = () => {
    onChange({ target: { name, value: "" } });
    setShowEmoji(false);
    setSelected(["😃", false]);
  };
  return (
    <div className={styles.emojiContainer}>
      <button
        type="button"
        className={`${styles.default} ${
          selected[1] || value ? styles.activeEmoji : ""
        }`}
        onClick={() => setShowEmoji(true)}
      >
        {value ? value : selected[0]}
      </button>

      {showEmoji && (
        <div className={styles.showEmoji}>
          <div className={styles.emojiCatContainer}>
            {Object.keys(emojiGroups).map((cat, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setActiveCat(cat)}
                className={styles.cat}
              >
                {emojiGroups[cat][0]}
              </button>
            ))}
          </div>
          <div className={styles.emojiGrid}>
            {emojiGroups[activeCat].map((e, index) => (
              <button
                type="button"
                key={index}
                name={name}
                className={styles.emoji}
                onClick={() => handleSelectEmoji(e)}
              >
                {e}
              </button>
            ))}
          </div>
          <div>
            <button
              type="button"
              className={styles.noEmoji}
              onClick={handleNoEmoji}
            >
              No Emoji
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventEmoji;
