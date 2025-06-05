# book-app
Untuk Memenuhi Assesment CNT

# Task yang dikerjakan
1. Implement filter for Library > Browse page by ratingand status
2. Implement Add Detail Page book
3. Implement Update status (read, Reading, Want To Read) in Detail page book

# File yang ditambahkan dan diedit
1. app.py
2. BookDetail.tsx
3. BrowseLibrary.tsx
4. App.tsx

# Frontend Changes (BookDetail.tsx)
The book detail page and status update functionality were implemented with the following changes:
// Example snippet for BookDetail.tsx (replace with your actual code)
const { id } = useParams<{ id: string }>();
const [status, setStatus] = useState<'read' | 'reading' | 'want-to-read'>('want-to-read');

useEffect(() => {
  const fetchBook = async () => {
    try {
      const response = await api.get(`/api/books/${id}`);
      setBook(response.data);
      setStatus(response.data.status);
    } catch (err) {
      console.error('Error fetching book:', err);
    }
  };
  fetchBook();
}, [id]);

const handleStatusChange = async (newStatus: 'read' | 'reading' | 'want-to-read') => {
  try {
    await api.put(`/api/books/${id}`, { status: newStatus });
    setStatus(newStatus);
  } catch (err) {
    console.error('Failed to update status', err);
  }
};

return (
  <div>
    <h2>Book Detail</h2>
    <img src={book.cover} alt={book.title} />
    <h3>{book.title}</h3>
    <p>Author: {book.author}</p>
    <p>Rating: {book.rating}</p>
    <p>Pages: {book.pages}</p>
    <p>Genre: {book.genre}</p>
    {status === 'want-to-read' && (
      <button onClick={() => handleStatusChange('reading')}>
        <Plus size={16} />
      </button>
    )}
    <div>
      <label>Change Status</label>
      <select value={status} onChange={(e) => handleStatusChange(e.target.value as any)}>
        <option value="read">Read</option>
        <option value="reading">Reading</option>
        <option value="want-to-read">Want to Read</option>
      </select>
    </div>
  </div>
);
