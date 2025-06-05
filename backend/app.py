from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Get configuration from environment variables
FLASK_HOST = os.getenv('FLASK_HOST', '0.0.0.0')
FLASK_PORT = int(os.getenv('FLASK_PORT', 5001))
FLASK_DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:8080,http://localhost:5173').split(',')
DATA_FILE = os.getenv('DATA_FILE', 'books.json')
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')

# Set Flask secret key
app.secret_key = SECRET_KEY

# Configure CORS with environment variables
CORS(app, 
     origins=CORS_ORIGINS,
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
     supports_credentials=True)

# Add a test endpoint to check CORS
@app.route('/api/test', methods=['GET', 'OPTIONS'])
def test_cors():
    return jsonify({"message": "CORS is working!"})

# Load books from JSON file
def load_books():
    try:
        with open(DATA_FILE, 'r') as f:
            data = json.load(f)
            return data.get('books', [])
    except FileNotFoundError:
        return []

# Save books to JSON file
def save_books(books_data):
    with open(DATA_FILE, 'w') as f:
        json.dump({'books': books_data}, f, indent=2)

# Initialize books from JSON file
books = load_books()

@app.route('/api/books', methods=['GET', 'OPTIONS'])
def get_books():
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    
    # Load books data
    books_data = load_books()
    
    # Get query parameters for filtering
    search = request.args.get('search', '').lower()
    genre = request.args.get('genre', 'all')
    status = request.args.get('status', 'all')
    min_rating = request.args.get('minRating', type=float)

    # Apply filters
    filtered_books = books_data

    if search:
        filtered_books = [
            book for book in filtered_books 
            if search in book['title'].lower() or search in book['author'].lower()
        ]
    
    if genre != 'all':
        filtered_books = [book for book in filtered_books if book['genre'] == genre]
    
    if status != 'all':
        filtered_books = [book for book in filtered_books if book['status'] == status]
    
    if min_rating is not None:
        filtered_books = [book for book in filtered_books if book['rating'] >= min_rating]

    return jsonify(filtered_books)

@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.json
    book = {
        'id': len(books) + 1,
        'title': data.get('title'),
        'author': data.get('author'),
        'cover': data.get('cover', ''),  # Book cover image URL
        'rating': data.get('rating', 0),  # Book rating (0-5)
        'pages': data.get('pages', 0),    # Number of pages
        'genre': data.get('genre', ''),   # Book genre
        'status': data.get('status', 'want-to-read')  # Reading status
    }
    books.append(book)
    save_books(books)  # Save to JSON file
    return jsonify(book), 201

@app.route('/api/books/<int:book_id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
def handle_book(book_id):
    if request.method == 'OPTIONS':
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response
    
    # Load books data
    books_data = load_books()
    
    # Find the book by ID
    book = next((b for b in books_data if b['id'] == book_id), None)
    if not book:
        return jsonify({'error': 'Book not found'}), 404

    if request.method == 'GET':
        return jsonify(book)

    if request.method == 'PUT':
        data = request.json
        for b in books:
            if b['id'] == book_id:
                b['title'] = data.get('title', b['title'])
                b['author'] = data.get('author', b['author'])
                b['cover'] = data.get('cover', b['cover'])
                b['rating'] = data.get('rating', b['rating'])
                b['pages'] = data.get('pages', b['pages'])
                b['genre'] = data.get('genre', b['genre'])
                b['status'] = data.get('status', b['status'])
                save_books(books)  # Save to JSON file
                return jsonify(b)

    if request.method == 'DELETE':
        for i, b in enumerate(books):
            if b['id'] == book_id:
                deleted_book = books.pop(i)
                save_books(books)  # Save to JSON file
                return jsonify(deleted_book)
        return jsonify({'error': 'Book not found'}), 404

if __name__ == '__main__':
    print(f"Starting Flask server on http://{FLASK_HOST}:{FLASK_PORT}")
    print("CORS enabled for development")
    print(f"Allowed origins: {CORS_ORIGINS}")
    app.run(debug=FLASK_DEBUG, port=FLASK_PORT, host=FLASK_HOST)