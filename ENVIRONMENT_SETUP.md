# Environment Configuration Guide

This guide explains how to set up environment variables for both the backend (Flask) and frontend (React + Vite) parts of the Book Tracker App.

## 📋 Overview

The application uses environment variables to configure:
- API URLs and endpoints
- Database connections
- CORS settings
- Debug modes
- Feature flags
- Security settings

## 🔧 Backend Configuration (Flask)

### Environment Files Created

- `env.example` - Template with all available variables
- `env.development` - Development environment settings
- `env.production` - Production environment settings

### Setup Methods

#### Method 1: Using Setup Script (Recommended)
```bash
cd backend
python setup.py
```

#### Method 2: Manual Setup
1. Copy the appropriate environment file:
   ```bash
   cp env.development .env  # For development
   # OR
   cp env.production .env   # For production
   ```

2. Edit the `.env` file as needed

### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FLASK_ENV` | Flask environment mode | `development` | No |
| `FLASK_DEBUG` | Enable debug mode | `True` | No |
| `FLASK_HOST` | Server host address | `0.0.0.0` | No |
| `FLASK_PORT` | Server port number | `5001` | No |
| `DATABASE_URL` | Database connection string | `sqlite:///books.db` | No |
| `CORS_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:8080,http://localhost:5173` | No |
| `SECRET_KEY` | Flask secret key | `dev-secret-key...` | **Yes** |
| `API_PREFIX` | API URL prefix | `/api` | No |
| `DATA_FILE` | JSON data file path | `books.json` | No |

## ⚛️ Frontend Configuration (React + Vite)

### Environment Files Created

- `env.example` - Template with all available variables
- `env.development` - Development environment settings
- `env.production` - Production environment settings

### Setup Methods

#### Method 1: Using Setup Script (Recommended)
```bash
cd frontend
node setup.js
```

#### Method 2: Manual Setup
1. Copy the appropriate environment file:
   ```bash
   cp env.development .env  # For development
   # OR
   cp env.production .env   # For production
   ```

2. Edit the `.env` file as needed

### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5001` | **Yes** |
| `VITE_API_BASE_URL` | Full API base URL with prefix | `http://localhost:5001/api` | **Yes** |
| `VITE_APP_TITLE` | Application title | `Book Tracker App` | No |
| `VITE_APP_DESCRIPTION` | Application description | `A full-stack web application...` | No |
| `VITE_NODE_ENV` | Node environment | `development` | No |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` | No |
| `VITE_ENABLE_DEBUG` | Enable debug logging | `true` | No |
| `VITE_ENABLE_MOCK_DATA` | Enable mock data | `true` | No |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` | No |
| `VITE_SHOW_DEV_TOOLS` | Show development tools | `true` | No |

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd backend
python setup.py
# Choose 'development' when prompted
pip install -r requirements.txt
python app.py
```

### 2. Frontend Setup
```bash
cd frontend
node setup.js
# Choose 'development' when prompted
npm install
npm run dev
```

## 🔄 API Integration

The frontend automatically configures API integration based on environment variables:

```typescript
// API service automatically uses:
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
```

### Development URLs
- Backend: `http://127.0.0.1:5001`
- Frontend: `http://localhost:8080` (configured in vite.config.ts)
- API Endpoints: `http://127.0.0.1:5001/api/*`

## 🌍 Production Deployment

### Backend Production Setup
1. Copy `env.production` to `.env`
2. **IMPORTANT**: Update these values:
   - `SECRET_KEY` - Use a strong, unique secret key
   - `DATABASE_URL` - Use production database (PostgreSQL recommended)
   - `CORS_ORIGINS` - Restrict to your production domain(s)
   - `FLASK_DEBUG` - Ensure it's `False`

### Frontend Production Setup
1. Copy `env.production` to `.env`
2. **IMPORTANT**: Update these values:
   - `VITE_API_URL` - Your production API URL
   - `VITE_API_BASE_URL` - Your production API URL with `/api`
   - `VITE_ENABLE_DEBUG` - Should be `false`
   - `VITE_ENABLE_ANALYTICS` - Configure as needed

## 🔒 Security Notes

### Backend Security
- **Never commit `.env` files to version control**
- Use strong, unique `SECRET_KEY` in production
- Restrict `CORS_ORIGINS` to necessary domains only
- Consider using environment-specific databases

### Frontend Security
- Vite only exposes variables prefixed with `VITE_`
- Never store sensitive data in frontend environment variables
- All `VITE_*` variables are public and visible to users

## 📝 Environment File Templates

All environment templates are provided:
- Backend: `env.example`, `env.development`, `env.production`
- Frontend: `env.example`, `env.development`, `env.production`

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `CORS_ORIGINS` in backend `.env`
   - Ensure frontend URL matches allowed origins

2. **API Connection Failed**
   - Verify `VITE_API_URL` in frontend `.env`
   - Check backend is running on correct port

3. **Environment Variables Not Loading**
   - Ensure `.env` file is in the correct directory
   - Restart development servers after changing `.env`
   - Check variable names match exactly (case-sensitive)

### Debug Steps
1. Check if `.env` files exist and have correct permissions
2. Verify environment variables are loaded (check console logs)
3. Ensure backend and frontend are using compatible configurations
4. Test API endpoints directly with curl or Postman

## 📞 Support

If you encounter issues with environment setup:
1. Check this documentation first
2. Verify all files are in correct locations
3. Ensure environment variables follow naming conventions
4. Test with provided development configurations first 