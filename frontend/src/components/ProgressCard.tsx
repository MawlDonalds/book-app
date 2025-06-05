
import { BookOpen, Play } from 'lucide-react';

interface BookProgress {
  id: number;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  lastRead: string;
}

interface ProgressCardProps {
  book: BookProgress;
}

const ProgressCard = ({ book }: ProgressCardProps) => {
  const progress = (book.currentPage / book.totalPages) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="text-orange-500" size={24} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{book.author}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Page {book.currentPage} of {book.totalPages}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">Last read: {book.lastRead}</p>
          </div>
        </div>
        
        <button className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
          <Play size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProgressCard;
