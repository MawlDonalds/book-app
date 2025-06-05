import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  pages: number;
  genre: string;
  status: 'read' | 'reading' | 'want-to-read';
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'read' | 'reading' | 'want-to-read'>('want-to-read');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await api.get<Book>(`/api/books/${id}`);
        console.log('Response from API:', response.data); 
        setBook(response.data);
        setStatus(response.data.status); 
        setError(null);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError(err.response?.data?.error || 'Gagal memuat detail buku.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleStatusChange = async (newStatus: 'read' | 'reading' | 'want-to-read') => {
    if (!book) return;
    try {
      await api.put(`/api/books/${book.id}`, { status: newStatus });
      setStatus(newStatus);
      setBook({ ...book, status: newStatus });
    } catch (err) {
      console.error('Gagal memperbarui status', err);
      setError('Gagal memperbarui status buku.');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!book) return <div className="text-center py-8">Buku tidak ditemukan</div>;

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 py-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-300 p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Book Detail</h2>
          <Link to="/" className="text-blue-500 hover:underline text-sm">Kembali</Link>
        </div>

        {/* Book Card Detail */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <img src={book.cover} alt={book.title} className="w-full h-48 object-cover rounded-lg" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
            <p className="text-gray-600 text-sm">Penulis: {book.author}</p>
            <p className="text-gray-600 text-sm">Rating: {book.rating}</p>
            <p className="text-gray-600 text-sm">Jumlah Halaman: {book.pages}</p>
            <p className="text-gray-600 text-sm">Genre: {book.genre}</p>
            <div className="relative mt-2">
              {status === 'want-to-read' ? (
                <button
                  className="absolute top-0 right-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors shadow-lg"
                  onClick={() => handleStatusChange('reading')}
                >
                  <Plus size={16} />
                </button>
              ) : (
                <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                  {status}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Selector */}
        <div className="bg-white rounded-xl p-4">
          <label className="block text-sm font-medium text-gray-700">Ubah Status</label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as 'read' | 'reading' | 'want-to-read')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="read">Sudah Dibaca</option>
            <option value="reading">Sedang Dibaca</option>
            <option value="want-to-read">Ingin Dibaca</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;