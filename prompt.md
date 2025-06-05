# Book Tracker App Project Documentation

## Project Overview
The Book Tracker App is a full-stack web application that allows users to manage their reading list. It consists of a Flask backend API and a React + Vite frontend with TypeScript and Tailwind CSS.

## Project Structure
```
book-tracker-app/
├── backend/
│   └── app.py              # Flask backend API
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── data/          # Data and mock files
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main React component
│   │   ├── App.css        # App-specific styles
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   ├── tailwind.config.ts # Tailwind configuration
│   ├── components.json    # shadcn/ui configuration
│   ├── postcss.config.js  # PostCSS configuration
│   ├── tsconfig.json      # TypeScript configuration
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Frontend dependencies
└── requirements.txt       # Backend dependencies
```

## Backend (Flask)
### Dependencies
- Flask==3.0.2
- Flask-Cors==4.0.0
- SQLAlchemy==2.0.28
- python-dotenv==1.0.1

### API Endpoints
1. `GET /api/books`
   - Returns all books
   - Response: Array of book objects

2. `POST /api/books`
   - Creates a new book
   - Request Body:
     ```json
     {
       "title": "string",
       "author": "string",
       "status": "unread" | "reading" | "completed"
     }
     ```

3. `PUT /api/books/<id>`
   - Updates an existing book
   - Request Body: Same as POST

4. `DELETE /api/books/<id>`
   - Deletes a book by ID

### Data Structure
```python
book = {
    'id': int,
    'title': str,
    'author': str,
    'status': str,  # 'unread', 'reading', or 'completed'
    'date_added': str  # ISO format datetime
}
```

## Frontend (React + Vite)
### Dependencies
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- ESLint
- PostCSS

### Project Structure Details
1. Components Directory (`/src/components/`)
   - Reusable UI components
   - Follows shadcn/ui component patterns

2. Pages Directory (`/src/pages/`)
   - Page-level components
   - Route-based organization

3. Hooks Directory (`/src/hooks/`)
   - Custom React hooks
   - Shared logic and state management

4. Lib Directory (`/src/lib/`)
   - Utility functions
   - Helper methods
   - Constants

5. Data Directory (`/src/data/`)
   - Mock data
   - Static content
   - Type definitions

### Configuration Files
1. `tailwind.config.ts`
   - Tailwind CSS configuration
   - Custom theme settings
   - Plugin configurations

2. `components.json`
   - shadcn/ui component configuration
   - Style and theme settings

3. `tsconfig.json`
   - TypeScript configuration
   - Path aliases
   - Compiler options

4. `vite.config.ts`
   - Vite bundler configuration
   - Plugin settings
   - Build options

### Styling
- Tailwind CSS for utility-first styling
- shadcn/ui for component styling
- Custom CSS in App.css and index.css
- PostCSS for processing

## Setup Instructions
1. Backend Setup:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cd backend
   python app.py
   ```

2. Frontend Setup:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Development Guidelines
1. Component Structure
   - Use functional components with TypeScript
   - Implement proper type definitions
   - Follow shadcn/ui component patterns

2. State Management
   - Use React hooks for local state
   - Implement custom hooks for shared logic
   - Consider context for global state

3. Styling
   - Use Tailwind CSS classes
   - Follow shadcn/ui design system
   - Maintain consistent spacing and colors

4. Type Safety
   - Define interfaces for all data structures
   - Use TypeScript strict mode
   - Implement proper error handling

## Current Features
- CRUD operations for books
- Status tracking (unread/reading/completed)
- Responsive design
- Error handling
- Loading states
- Type safety with TypeScript

## Potential Enhancements
1. Authentication
2. Search and filtering
3. Sorting options
4. Book categories/tags
5. Reading progress tracking
6. Book ratings and reviews
7. Database integration
8. User profiles and personal libraries 