
const Book = ({ title, author, thumbnail }) => {
  return (
    <div className="bg-white w-[8em] rounded-lg shadow-md h-[16em]">
      <div className="w-[100%] h-[12em]">
        <img src={thumbnail} alt={title} className="w-[100%] h-[100%] object-cover rounded-t-lg mx-auto mb-4" />
      </div>
      <div className="px-2">  
        <h2 className="text-md font-medium text-gray-800 truncate" title={title}>{title}</h2>
        <p className="text-xs text-gray-600 mb-2 truncate" title={author}>{author}</p>
      </div>
    </div>
  )
}

export default Book
