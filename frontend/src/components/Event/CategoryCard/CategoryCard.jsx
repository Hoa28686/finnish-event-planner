import styles from "./CategoryCard.module.css";

const CategoryCard = ({ category }) => {
  return (
    <div className={styles.categoryCard}>
      <p>{category}</p>
    </div>
  );
};

export default CategoryCard;
