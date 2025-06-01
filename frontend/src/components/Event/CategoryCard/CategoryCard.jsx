import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
  return (
    <div className="categoryCard">
      <p>{category}</p>
    </div>
  );
};

export default CategoryCard;
