# Portfolio & Blog API

A RESTful API built with Node.js, Express, and MongoDB for managing a personal portfolio website with blog functionality.

## Live Demo

- **API URL**: https://portfolio-backend-j145okke2-ioawsjddfjswisahfasiks-projects.vercel.app
- **Frontend URL**: https://portfolio-frontend-pq0e5hwqz-ioawsjddfjswisahfasiks-projects.vercel.app
- **Source Code**: https://github.com/HANLUYAO152496738/portfolio-backend

## Features

- User authentication with JWT
- Password hashing with bcrypt
- CRUD operations for projects
- Blog posts with comments
- Contact form message storage
- Protected routes with authorization
- Central error handling
- Security with Helmet

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Security**: Helmet

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Login and get JWT token | Public |
| GET | `/api/users/profile` | Get user profile | Protected |

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create a project | Protected |
| PUT | `/api/projects/:id` | Update a project | Protected |
| DELETE | `/api/projects/:id` | Delete a project | Protected |

### Blog Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create a blog post | Protected |
| PUT | `/api/blog/:id` | Update a blog post | Protected (Author only) |
| DELETE | `/api/blog/:id` | Delete a blog post | Protected (Author only) |

### Comments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Create a comment | Protected |

### Contact

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact form | Public |
| GET | `/api/contact` | Get all messages | Protected |

## Data Models

### User
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, minlength: 6)
}
```

### Project
```javascript
{
  title: String (required),
  description: String (required),
  imageUrl: String (optional),
  repoUrl: String (optional),
  liveUrl: String (optional),
  user: ObjectId (ref: User)
}
```

### BlogPost
```javascript
{
  title: String (required),
  content: String (required),
  author: ObjectId (ref: User),
  timestamps: true
}
```

### Comment
```javascript
{
  body: String (required),
  author: ObjectId (ref: User),
  post: ObjectId (ref: BlogPost),
  timestamps: true
}
```

### Message
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  timestamps: true
}
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

5. For production:
```bash
npm start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT signing |
| NODE_ENV | Environment (development/production) |
| FRONTEND_URL | Frontend URL for CORS |

## Deployment

This API is deployed on Vercel.

### Vercel Deployment

The API is currently deployed at:
https://portfolio-backend-j145okke2-ioawsjddfjswisahfasiks-projects.vercel.app

To deploy your own instance:
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project directory
3. Set environment variables in Vercel dashboard or via CLI
4. Deploy with `vercel --prod`

## Testing

Use Postman or Thunder Client to test the API endpoints.

### Example: Register User
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Example: Login
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### Example: Protected Request
```bash
GET /api/users/profile
Authorization: Bearer <your_jwt_token>
```

## License

MIT
