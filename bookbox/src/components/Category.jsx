import { useState } from "react";
import { Link } from "react-router-dom";

const Category = ({ name }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Link to={`/${name}`}>
      <div
        className={`flex flex-row items-center rounded font-semibold justify-center w-[10em] px-4 h-24 ${
          isHovered
            ? "bg-yellow-100 transition-colors duration-300"
            : "bg-yellow-200 transition-colors duration-300"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={`text-black text-center`}>{name}</span>
      </div>
    </Link>
  );
};

export default Category;
