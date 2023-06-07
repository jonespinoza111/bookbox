
const Book = ({ title, author, description, thumbnail }) => {
  return (
    <div className="bg-white w-[20em] rounded-lg shadow-md p-4">
      <img src={thumbnail} alt={title} className="w-32 h-48 object-cover rounded-md mx-auto mb-4" />
      <h2 className="text-lg font-medium text-gray-800">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{author}</p>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  )
}

export default Book
