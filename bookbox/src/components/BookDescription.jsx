import { useState } from "react";

const BookDescription = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const truncatedDescription = description + '...';

    const renderedDescription = isExpanded ? description : truncatedDescription;

    const handleToggleDescription = () => {
        setIsExpanded(!isExpanded);
    };
  return (
    <>
        <span className="font-bold text-white">Description:</span>
        {/* <p className={`${isExpanded ? '' : 'line-clamp-3'} w-[100%] text-gray-400`}>{renderedDescription}</p> */}
        <div dangerouslySetInnerHTML={{ __html: renderedDescription }} className={`${isExpanded ? '' : 'line-clamp-3'} w-[100%] text-gray-400 mt-5 mb-2`} />
        <button
        onClick={handleToggleDescription}
        className="text-blue-500 hover:text-blue-700"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </>
  )
}

export default BookDescription;
