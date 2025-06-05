
export const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "",
    rating: 4.2,
    pages: 180,
    genre: "Classic",
    status: "read" as const
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "",
    rating: 4.8,
    pages: 376,
    genre: "Fiction",
    status: "read" as const
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover: "",
    rating: 4.6,
    pages: 328,
    genre: "Dystopian",
    status: "reading" as const
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "",
    rating: 4.4,
    pages: 432,
    genre: "Romance",
    status: "want-to-read" as const
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "",
    rating: 3.8,
    pages: 277,
    genre: "Coming-of-age",
    status: "read" as const
  },
  {
    id: 6,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    cover: "",
    rating: 4.7,
    pages: 309,
    genre: "Fantasy",
    status: "read" as const
  },
  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    cover: "",
    rating: 4.9,
    pages: 1216,
    genre: "Fantasy",
    status: "want-to-read" as const
  },
  {
    id: 8,
    title: "Dune",
    author: "Frank Herbert",
    cover: "",
    rating: 4.3,
    pages: 688,
    genre: "Sci-Fi",
    status: "reading" as const
  }
];

export const currentlyReading = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    currentPage: 120,
    totalPages: 320,
    lastRead: "2 hours ago"
  },
  {
    id: 2,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    currentPage: 45,
    totalPages: 400,
    lastRead: "Yesterday"
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    currentPage: 200,
    totalPages: 496,
    lastRead: "3 days ago"
  }
];

export const readingStats = {
  totalBooks: 47,
  currentStreak: 12,
  avgRating: 4.3,
  pagesThisWeek: 245,
  booksThisMonth: 3,
  favoriteGenre: "Science Fiction"
};

export const readingGoals = {
  yearlyGoal: 50,
  currentProgress: 32,
  pagesGoal: 15000,
  pagesRead: 9840
};
