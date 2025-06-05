
import { Star, BookOpen, Clock } from 'lucide-react';

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

interface BookCardProps {
  book: Book;
  variant?: 'default' | 'compact' | 'library' | 'discover';
}

const BookCard = ({ book, variant = 'default' }: BookCardProps) => {
  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-105">
        <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="text-blue-500" size={32} />
          </div>
          <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1">
            <span className="text-xs font-medium text-gray-700">{book.rating}★</span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
          <p className="text-xs text-gray-600">{book.author}</p>
        </div>
      </div>
    );
  }

  if (variant === 'library') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="aspect-[3/4] bg-gradient-to-br from-green-100 to-blue-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="text-green-500" size={28} />
          </div>
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
            book.status === 'read' ? 'bg-green-100 text-green-700' :
            book.status === 'reading' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {book.status === 'read' ? 'Read' : book.status === 'reading' ? 'Reading' : 'Want to Read'}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
          <p className="text-xs text-gray-600 mb-2">{book.author}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{book.pages} pages</span>
            <div className="flex items-center">
              <Star size={12} className="text-yellow-400 mr-1" />
              {book.rating}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'discover') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
        <div className="flex space-x-3">
          <div className="w-16 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="text-purple-500" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{book.author}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {book.genre}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Star size={14} className="text-yellow-400 mr-1" />
                {book.rating}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex space-x-4">
        <div className="w-20 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="text-blue-500" size={28} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-1">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          <div className="flex items-center mb-2">
            <Star size={16} className="text-yellow-400 mr-1" />
            <span className="text-sm text-gray-700">{book.rating}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            {book.pages} pages
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
