# Travel Planning App

A full-stack application for planning and managing your trips, built with React, TypeScript, Node.js, Express, MongoDB, and native Android.

## Architecture Overview

### System Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  React Client   │────▶│  Express Server │────▶│    MongoDB     │
│    & Android    │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Key Operations Flow

#### Trip Creation Flow
```
┌──────────┐  1. Submit Form   ┌──────────┐  2. Validate   ┌──────────┐
│          │─────────────────▶│          │───────────────▶│          │
│  React   │                  │  Express  │                │ MongoDB  │
│  Client  │◀─────────────────│  Server   │◀──────────────│         │
│          │  4. Return Trip   │          │  3. Save Trip  │         │
└──────────┘                  └──────────┘                └──────────┘
```

#### Authentication Flow
```
┌──────────┐  1. Login        ┌──────────┐  2. Verify    ┌──────────┐
│          │─────────────────▶│          │───────────────▶│          │
│  React   │                  │  Express  │               │ MongoDB  │
│  Client  │◀─────────────────│  Server   │◀──────────────│         │
│          │  4. JWT Token    │          │  3. Get User  │         │
└──────────┘                  └──────────┘               └──────────┘
```

### Technology Stack Details

#### Frontend Technologies
- **React (v18.2.0)**: Core UI library for building component-based interfaces
- **TypeScript (v4.9.5)**: Static typing for improved development experience and code quality
- **Material-UI (v5.15.7)**: React component library implementing Google's Material Design
  - `@mui/material`: Core Material-UI components
  - `@mui/icons-material`: Material Design icons
  - `@mui/x-date-pickers`: Advanced date/time picker components
- **React Router (v6.22.0)**: Client-side routing and navigation
- **Axios (v1.6.7)**: HTTP client for API requests
- **date-fns (v2.30.0)**: Date manipulation and formatting
- **Emotion**: CSS-in-JS styling solution
  - `@emotion/react`: Core emotion library
  - `@emotion/styled`: Styled component API

#### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express (v4.18.2)**: Web application framework
- **TypeScript**: Type-safe development
- **MongoDB**: NoSQL database
- **Mongoose (v7.0.3)**: MongoDB object modeling
- **JSON Web Token (v9.0.0)**: Authentication mechanism
- **bcryptjs (v2.4.3)**: Password hashing
- **cors (v2.8.5)**: Cross-Origin Resource Sharing middleware
- **dotenv (v16.0.3)**: Environment variable management

### Component Architecture

#### Frontend Structure
```
client/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Home.tsx         # Landing page
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── TripPlanner.tsx  # Trip creation/editing
│   │   └── Trips.tsx        # Trip listing
│   ├── contexts/         # React Context providers
│   │   └── TripContext.tsx  # Trip state management
│   ├── services/         # API service layer
│   │   └── api.ts          # API client configuration
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions
```

#### Backend Structure
```
server/
├── src/
│   ├── models/          # Mongoose data models
│   │   ├── Trip.ts        # Trip schema and model
│   │   └── User.ts        # User schema and model
│   ├── routes/          # API route handlers
│   │   └── trips.ts       # Trip-related endpoints
│   ├── middleware/      # Custom middleware
│   │   └── auth.ts        # Authentication middleware
│   ├── config/          # Configuration
│   │   └── database.ts    # Database connection
│   └── server.ts        # Application entry point
```

### Key Features and Implementation Details

#### 1. State Management
- **Context API**: Used for global state management
  - `TripContext`: Manages trip data and operations
  - Provides CRUD operations for trips
  - Handles loading and error states

#### 2. Authentication
- **JWT-based authentication**
  - Token storage in localStorage
  - Protected routes and API endpoints
  - Automatic token inclusion in API requests

#### 3. Data Models

##### Trip Model
```typescript
{
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
  activities: Array<{
    name: string,
    date: Date,
    location: string,
    notes: string
  }>,
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
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled'
}
```

##### User Model
```typescript
{
  email: string,
  password: string (hashed),
  name: string,
  profilePicture?: string,
  preferences: {
    currency: string,
    language: string,
    timeZone: string
  }
}
```

#### 4. API Endpoints

##### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

##### Trips
- GET `/api/trips` - Get all trips for authenticated user
- GET `/api/trips/:id` - Get specific trip
- POST `/api/trips` - Create new trip
- PUT `/api/trips/:id` - Update trip
- DELETE `/api/trips/:id` - Delete trip

#### 5. UI Components

##### Material-UI Implementation
- **Theme Customization**: Custom theme with responsive typography and color palette
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Form Components**: Advanced form controls with validation
- **Date Handling**: Integration with MUI X Date Pickers

##### Custom Components
- **Navbar**: Fixed position with responsive menu
- **TripPlanner**: Multi-step form with validation
- **TripList**: Responsive grid layout with card-based design
- **Home**: Landing page with featured destinations

#### 6. Development Tools

##### Frontend
- **React Scripts**: Development server and build tools
- **ESLint**: Code linting with TypeScript support
- **Jest & Testing Library**: Unit and integration testing

##### Backend
- **ts-node-dev**: TypeScript execution and hot reloading
- **nodemon**: Development server with auto-restart
- **Jest**: Backend testing framework

### Data Flow and State Management

#### Frontend State Management
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   TripContext   │────▶│   API Service   │────▶│    Backend      │
│   (Provider)    │     │    (Axios)      │     │    API          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         ▲                                               │
         │                                               │
         └───────────────────────────────────────────────┘
                          Data Flow
```

#### Backend Data Flow
```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Route     │────▶│  Controller  │────▶│    Model     │
│   Handler    │     │    Logic     │     │  (Mongoose)  │
└──────────────┘     └──────────────┘     └──────────────┘
         ▲                                        │
         │                                        │
         └────────────────────────────────────────┘
                       Response
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
├── server/          # Express backend
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.ts
│   └── package.json
└── android-app/     # Native Android app
    ├── app/
    │   ├── src/
    │   │   ├── main/
    │   │   │   ├── java/com/planningapp/
    │   │   │   │   ├── data/          # Data layer
    │   │   │   │   ├── domain/        # Business logic
    │   │   │   │   └── ui/            # User interface
    │   │   │   └── res/               # Resources
    │   │   └── test/                  # Unit tests
    │   └── build.gradle
    └── build.gradle
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

## Development Workflow

### Local Development
1. Start MongoDB service
2. Run backend server in development mode
3. Run frontend development server
4. Access application at http://localhost:3000

### Code Organization
- Follow component-based architecture
- Maintain separation of concerns
- Use TypeScript for type safety
- Implement proper error handling
- Follow REST API best practices

### Testing Strategy
1. Unit Tests
   - Component testing with React Testing Library
   - API endpoint testing with Jest
   - Model validation testing
   
2. Integration Tests
   - API integration tests
   - Frontend integration tests
   - Database operations tests

3. End-to-End Tests
   - User flow testing
   - Critical path testing
   - Cross-browser testing

### Deployment Process
1. Build frontend assets
2. Compile TypeScript to JavaScript
3. Set up environment variables
4. Deploy to hosting platform
5. Configure database connection
6. Set up SSL certificates
7. Configure domain and DNS

## Android App Implementation

### Overview
The Android app provides a native mobile experience for the Travel Planning App, implementing the same features as the web client with platform-specific optimizations and offline capabilities.

### Technology Stack
- **Language**: Java
- **Minimum SDK**: Android 7.0 (API 24)
- **Target SDK**: Android 14 (API 34)

### Key Components

#### Architecture
- **MVVM Pattern**: Separation of UI, business logic, and data
- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **Repository Pattern**: Single source of truth for data management

#### Libraries & Frameworks
- **AndroidX Components**:
  - ViewBinding: Type-safe view access
  - Navigation: Screen navigation
  - ViewModel: UI state management
  - Room: Local database
  - LiveData: Observable data holder
- **Networking**: Retrofit with OkHttp
- **Image Loading**: Glide
- **Date/Time**: ThreeTenABP

### Features
1. **Trip Management**:
   - View trip list with status indicators
   - Create and edit trips
   - Offline support with local storage
   - Image caching

2. **User Interface**:
   - Material Design components
   - Responsive layouts
   - Dark theme support
   - Smooth transitions

3. **Data Synchronization**:
   - Background sync with server
   - Conflict resolution
   - Offline-first approach

### Development Setup

1. **Requirements**:
   - Android Studio Arctic Fox or newer
   - JDK 8 or higher
   - Android SDK with API 34 platform

2. **Build & Run**:
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd PlanningApp/android-app

   # Open in Android Studio
   # or build from command line:
   ./gradlew assembleDebug
   ```

3. **Testing**:
   ```bash
   # Run unit tests
   ./gradlew test

   # Run instrumented tests
   ./gradlew connectedAndroidTest
   ```

### Project Structure Details

#### Data Layer (`data/`)
- **api/**: Retrofit service interfaces and API models
- **db/**: Room database, DAOs, and entities
- **model/**: Data models and mappers
- **repository/**: Repository implementations

#### Domain Layer (`domain/`)
- **model/**: Business models
- **repository/**: Repository interfaces
- **usecase/**: Business logic use cases

#### UI Layer (`ui/`)
- **activities/**: Main app screens
- **adapters/**: RecyclerView adapters
- **fragments/**: UI components
- **viewmodel/**: ViewModels for each screen

### Resource Organization
- **layout/**: XML layouts for activities and fragments
- **values/**: 
  - colors.xml: Color definitions
  - strings.xml: Text resources
  - themes.xml: App theme and styles
- **drawable/**: Icons and images

### Security Considerations
- API key storage in BuildConfig
- ProGuard configuration for release builds
- Network security configuration
- Data encryption for sensitive information

### Deployment Process
1. Configure signing keys
2. Update version numbers
3. Run ProGuard optimization
4. Generate release APK/Bundle
5. Test release version
6. Deploy to Play Store

## Getting Started

### Clone the Repository
```bash
git clone https://github.com/gitmujoshi/TripPlanningApp.git
cd TripPlanningApp
```

### Setup and Run

#### Backend (Node.js + Express)
```bash
cd server
npm install
npm run dev
```

#### Frontend (React)
```bash
cd client
npm install
npm start
```

#### Android App
1. Open the `android-app` directory in Android Studio
2. Sync Gradle files
3. Run the app on an emulator or physical device

### Environment Setup
1. Create a `.env` file in the `server` directory:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/travel-planner
JWT_SECRET=your-super-secret-jwt-key
```

2. Ensure MongoDB is running locally or update the `MONGODB_URI` to point to your MongoDB instance

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Mukesh Joshi - [@gitmujoshi](https://github.com/gitmujoshi)

Project Link: [https://github.com/gitmujoshi/TripPlanningApp](https://github.com/gitmujoshi/TripPlanningApp)