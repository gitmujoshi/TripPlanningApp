# Travel Planning App

A full-stack application for planning and managing your trips, built with React, TypeScript, Node.js, Express, and MongoDB.

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