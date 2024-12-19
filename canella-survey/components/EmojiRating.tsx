import React from "react";
import styles from "../styles/EmojiRating.module.css";

interface EmojiRatingProps {
  title: string;
  currentRating: number | null;
  onRatingChange: (title: string, rating: number) => void;
}

const EmojiRating: React.FC<EmojiRatingProps> = ({ title, currentRating, onRatingChange }) => {
  const emojis = ["😡", "😟", "😐", "😊", "😁"];

  const handleRating = (index: number) => {
    onRatingChange(title, index + 1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.emojiGrid}>
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className={`${styles.emojiButton} ${currentRating === index + 1 ? styles.selected : ""}`}
            onClick={() => handleRating(index)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <p className={styles.feedback}>
        Sua avaliação: {currentRating ? `${currentRating}/5` : "Ainda não avaliado"}
      </p>
    </div>
  );
};

export default EmojiRating;
