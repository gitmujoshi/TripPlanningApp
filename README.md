# Travel Planning App

A full-stack application for planning and managing your trips, built with React, TypeScript, Node.js, Express, and MongoDB.

## Architecture Overview

### System Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Client   │────▶│  Express Server │────▶│    MongoDB     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Component Architecture

#### Frontend
```
client/
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/         # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── App.tsx          # Root component
```

#### Backend
```
server/
├── src/
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── middleware/      # Custom middleware
│   ├── config/          # Configuration
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   └── server.ts       # Entry point
```

## Design Details

### Data Models

#### User
```typescript
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  name: string,
  createdAt: Date,
  updatedAt: Date
}
```

#### Trip
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  destination: string,
  country: string,
  startDate: Date,
  endDate: Date,
  description: string,
  image: string,
  budget: {
    amount: number,
    currency: string
  },
  activities: Array<string>,
  accommodation: {
    name: string,
    address: string,
    checkIn: Date,
    checkOut: Date,
    bookingReference: string
  },
  transportation: {
    type: string,
    bookingReference: string,
    departureTime: Date,
    arrivalTime: Date,
    notes: string
  },
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled',
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
PlanningApp/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── ...
│   └── package.json
└── server/          # Express backend
    ├── src/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── server.ts
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Dependencies Installation

### System Dependencies

#### macOS
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Install development tools
brew install git
```

#### Linux (Ubuntu/Debian)
```bash
# Update package list
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install -y mongodb-org

# Install development tools
sudo apt install -y git
```

### Project Dependencies

#### Backend Dependencies
```bash
cd server

# Install backend dependencies
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/cors @types/jsonwebtoken @types/bcryptjs @types/mongoose

# Create tsconfig.json if not exists
npx tsc --init
```

Key backend dependencies:
- `express`: Web framework
- `mongoose`: MongoDB object modeling
- `dotenv`: Environment variables management
- `cors`: Cross-origin resource sharing
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing
- `typescript`: TypeScript support
- `ts-node-dev`: TypeScript development server

#### Frontend Dependencies
```bash
cd client

# Install frontend dependencies
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
npm install @mui/x-date-pickers date-fns axios react-router-dom
npm install --save-dev typescript @types/react @types/react-dom @types/react-router-dom

# Additional development dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Key frontend dependencies:
- `react` & `react-dom`: React framework
- `@mui/material` & `@mui/icons-material`: Material-UI components
- `@emotion/react` & `@emotion/styled`: Styling solution
- `@mui/x-date-pickers` & `date-fns`: Date handling
- `axios`: HTTP client
- `react-router-dom`: Routing
- `typescript`: TypeScript support
- `@testing-library/*`: Testing utilities

### Verify Installation

1. Verify Node.js installation:
```bash
node --version  # Should be v14 or higher
npm --version   # Should be v6 or higher
```

2. Verify MongoDB installation:
```bash
mongod --version  # Should be v4.4 or higher
```

3. Verify project dependencies:
```bash
# In server directory
npm list --depth=0

# In client directory
npm list --depth=0
```

## Setup Instructions

### 1. MongoDB Setup

Make sure MongoDB is installed and running:
```bash
# Start MongoDB (macOS)
brew services start mongodb-community
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-planner
JWT_SECRET=your-super-secret-jwt-key" > .env

# Start development server
npm run dev
```

The backend server will run on http://localhost:5000

### 3. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm start
```

The frontend application will run on http://localhost:3000

### 4. External Access Setup (Development)

To make your development instance accessible from the internet, you can use ngrok:

1. **Install ngrok**
   ```bash
   npm install -g ngrok
   ```

2. **Sign up and Configure ngrok**
   - Sign up for a free account at https://dashboard.ngrok.com/signup
   - Get your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken
   - Configure ngrok with your token:
     ```bash
     ngrok config add-authtoken YOUR_AUTH_TOKEN
     ```

3. **Start Your Application**
   ```bash
   cd client
   npm start
   ```

4. **Create Tunnel**
   In a new terminal:
   ```bash
   ngrok http 3000
   ```
   
5. **Access Your Application**
   - ngrok will provide you with a public URL (e.g., https://your-tunnel.ngrok.io)
   - Share this URL to allow others to access your development instance
   - Note: The URL changes each time you restart ngrok (unless you have a paid plan)

**Important Notes:**
- Keep your ngrok terminal window open while sharing
- The free plan has some limitations (e.g., tunnel URLs change each session)
- For persistent URLs, consider upgrading to a paid ngrok plan
- Never expose sensitive data or credentials through development instances

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Trips
- GET `/api/trips` - Get all trips for authenticated user
- POST `/api/trips` - Create a new trip
- PUT `/api/trips/:id` - Update a trip
- DELETE `/api/trips/:id` - Delete a trip

## Features

- User authentication (register/login)
- Create, read, update, and delete trips
- Trip details including:
  - Destination
  - Start/End dates
  - Description
  - Transportation details
  - Accommodation details
  - Trip status tracking

## Tech Stack

### Frontend
- React
- TypeScript
- Material-UI
- React Router
- date-fns

### Backend
- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication

## Development

To run both frontend and backend in development mode:

1. Start MongoDB
2. Start the backend server (in server directory): `npm run dev`
3. Start the frontend development server (in client directory): `npm start`

## Production Deployment

1. Build the frontend:
```bash
cd client
npm run build
```

2. Build the backend:
```bash
cd server
npm run build
```

3. Set up environment variables for production
4. Deploy to your preferred hosting platform

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 

## Pending Tasks

### Frontend
1. [ ] Implement responsive design for mobile devices
2. [ ] Add form validation for trip creation/editing
3. [ ] Implement image upload for trip photos
4. [ ] Add loading states and error handling
5. [ ] Implement trip filtering and sorting
6. [ ] Add trip sharing functionality
7. [ ] Implement offline support using service workers
8. [ ] Add user profile management
9. [ ] Implement trip statistics and analytics
10. [ ] Add dark mode support

### Backend
1. [ ] Implement rate limiting
2. [ ] Add request validation middleware
3. [ ] Implement file upload service for images
4. [ ] Add caching layer for frequently accessed data
5. [ ] Implement email notifications
6. [ ] Add user roles and permissions
7. [ ] Implement API versioning
8. [ ] Add logging service
9. [ ] Implement backup strategy
10. [ ] Add health check endpoints

### DevOps
1. [ ] Set up CI/CD pipeline
2. [ ] Implement automated testing
3. [ ] Set up monitoring and alerting
4. [ ] Configure production deployment
5. [ ] Set up database backups
6. [ ] Implement security scanning
7. [ ] Set up staging environment
8. [ ] Configure SSL certificates
9. [ ] Implement containerization
10. [ ] Set up load balancing

### Documentation
1. [ ] Add API documentation using Swagger/OpenAPI
2. [ ] Create user documentation
3. [ ] Add code documentation
4. [ ] Create deployment guide
5. [ ] Document database schema
6. [ ] Add contribution guidelines
7. [ ] Create security documentation
8. [ ] Add troubleshooting guide
9. [ ] Document testing procedures
10. [ ] Create architecture decision records (ADRs) 