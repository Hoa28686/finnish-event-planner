import { useEffect, useState } from "react";

const useCategory = ({ categories, setUpdate, handleMessage, onAddCat }) => {
  const [addingCat, setAddingCat] = useState(false);
  const [newCat, setNewCat] = useState("");
  const newCatText = newCat.trim().toLowerCase();
  const isAddDisabled =
    newCatText === "" || (categories && categories.includes(newCatText));

  useEffect(() => {
    if (categories.includes(newCatText)) {
      handleMessage(`"${newCatText}" category exists`);
    }
  }, [newCat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "create") {
      setUpdate((prev) => ({ ...prev, category: "others" }));
      setAddingCat(true);
    } else {
      setUpdate((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCat = () => {
    onAddCat(newCatText);
    setUpdate((prev) => ({ ...prev, category: newCatText }));
    setAddingCat(false);
    setNewCat("");
  };

  const handleCatCancel = () => {
    setAddingCat(false);
    setNewCat("");
  };
  return {
    addingCat,
    newCat,
    setNewCat,
    handleChange,
    handleAddCat,
    handleCatCancel,
    isAddDisabled,
  };
};

export default useCategory;
