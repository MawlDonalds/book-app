import { Search, Filter, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import BookCard from './BookCard';

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

const ratingRanges = [
  { label: "Any Rating", min: null, max: null },
  { label: "2.0 - 2.9", min: 2.0, max: 2.9 },
  { label: "3.0 - 3.9", min: 3.0, max: 3.9 },
  { label: "4.0 - 4.9", min: 4.0, max: 4.9 },
  { label: "5.0", min: 5.0, max: 5.0 },
];

const BrowseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRatingRange, setSelectedRatingRange] = useState(ratingRanges[0]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await api.get<Book[]>('/api/books');
        setBooks(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const genres = ['all', ...new Set(books.map(book => book.genre))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = searchTerm
      ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesStatus = selectedStatus === 'all' || book.status === selectedStatus;
    const matchesRating = selectedRatingRange.min === null ||
                          (book.rating >= selectedRatingRange.min && book.rating <= selectedRatingRange.max);
    return matchesSearch && matchesGenre && matchesStatus && matchesRating;
  });

  const handleAddBook = async (bookId: number) => {
    try {
      await api.put(`/api/books/${bookId}`, {
        status: 'want-to-read'
      });
      setBooks(books.map(book =>
        book.id === bookId
          ? { ...book, status: 'want-to-read' }
          : book
      ));
    } catch (err) {
      console.error('Error adding book:', err);
      setError('Failed to add book. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Browse Library</h2>
        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Filter size={20} />
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <div className="px-4 py-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setShowFilter(false);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="read">Read</option>
                    <option value="reading">Reading</option>
                    <option value="want-to-read">Want to Read</option>
                  </select>
                </div>
                <div className="px-4 py-2">
                  <label className="block text-sm font-medium text-gray-700">Rating Range</label>
                  <select
                    value={selectedRatingRange.label}
                    onChange={(e) => {
                      const selected = ratingRanges.find(range => range.label === e.target.value);
                      setSelectedRatingRange(selected);
                      setShowFilter(false);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {ratingRanges.map(range => (
                      <option key={range.label} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search books or authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Genre Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedGenre === genre
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {genre === 'all' ? 'All Genres' : genre}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600">
        {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
      </p>

      {/* Books Grid */}
      <div className="space-y-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id} className="block">
              <div className="relative">
                <BookCard book={book} variant="discover" />
                {book.status === 'want-to-read' ? (
                  <button
                    className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddBook(book.id);
                    }}
                  >
                    <Plus size={16} />
                  </button>
                ) : (
                  <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {book.status}
                  </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No books found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseLibrary;