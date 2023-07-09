

const BookThumbnail = ({ title, thumbnail, size = "medium" }) => {
  return (
    <div className={`bg-white ${size == "medium" && 'w-[8em] h-[16em]'} rounded-lg shadow-md ${size == "small" && 'w-[6em] h-[10em]'}`} title={title}>
        <img src={thumbnail} alt={title} className="w-[100%] h-[100%] object-fill rounded-t-lg mx-auto mb-4" />
    </div>
  )
}

export default BookThumbnail;
