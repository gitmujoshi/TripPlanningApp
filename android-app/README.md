# Travel Planning App - Android

Native Android client for the Travel Planning application, providing a seamless mobile experience for managing trips and travel plans.

## Architecture Overview

The app follows Clean Architecture principles with MVVM pattern:

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  ┌─────────────┐    ┌──────────────┐   ┌────────────┐  │
│  │  Activities │    │  Fragments   │   │ ViewModels │  │
│  └─────────────┘    └──────────────┘   └────────────┘  │
├─────────────────────────────────────────────────────────┤
│                      Domain Layer                        │
│  ┌─────────────┐    ┌──────────────┐   ┌────────────┐  │
│  │  Use Cases  │    │   Entities   │   │ Repository │  │
│  └─────────────┘    └──────────────┘   │ Interfaces │  │
│                                        └────────────┘  │
├─────────────────────────────────────────────────────────┤
│                       Data Layer                         │
│  ┌─────────────┐    ┌──────────────┐   ┌────────────┐  │
│  │  API Client │    │  Local DB    │   │ Repository │  │
│  └─────────────┘    └──────────────┘   │   Impl    │  │
│                                        └────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Layer Details

#### 1. Presentation Layer
- **Activities**: Main UI containers
- **Fragments**: Reusable UI components
- **ViewModels**: UI state management and business logic
- **Adapters**: RecyclerView data binding
- **Custom Views**: Reusable UI elements

#### 2. Domain Layer
- **Use Cases**: Business logic operations
- **Entities**: Core business models
- **Repository Interfaces**: Data access contracts
- **Domain Models**: Pure business objects

#### 3. Data Layer
- **Repository Implementations**: Data source management
- **Remote Data Source**: API client (Retrofit)
- **Local Data Source**: Room database
- **Data Models**: DTO objects

## Project Structure

```
app/
├── src/
│   ├── main/
│   │   ├── java/com/planningapp/
│   │   │   ├── data/
│   │   │   │   ├── api/
│   │   │   │   │   ├── TripService.java
│   │   │   │   │   └── models/
│   │   │   │   ├── db/
│   │   │   │   │   ├── TripDao.java
│   │   │   │   │   └── entities/
│   │   │   │   └── repositories/
│   │   │   ├── domain/
│   │   │   │   ├── models/
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   └── ui/
│   │   │       ├── activities/
│   │   │       ├── adapters/
│   │   │       ├── fragments/
│   │   │       └── viewmodels/
│   │   └── res/
│   │       ├── layout/
│   │       ├── values/
│   │       └── drawable/
│   └── test/
└── build.gradle
```

## Features

### 1. Trip Management
- View trip list with status indicators
- Create and edit trips
- Offline support with local storage
- Image caching and lazy loading
- Trip status tracking

### 2. User Interface
- Material Design 3 components
- Responsive layouts
- Dark theme support
- Motion layout animations
- Custom transitions

### 3. Data Synchronization
- Background sync with server
- Conflict resolution
- Offline-first approach
- Data consistency checks

## Development Setup

### Prerequisites
- Android Studio Arctic Fox or newer
- JDK 8 or higher
- Android SDK (API 34)
- Gradle 8.2.2 or newer

### Building the Project

1. **Clone the Repository**
```bash
git clone https://github.com/gitmujoshi/TripPlanningApp.git
cd TripPlanningApp/android-app
```

2. **Open in Android Studio**
- Open Android Studio
- Select "Open an Existing Project"
- Navigate to the `android-app` directory
- Click "OK"

3. **Configure Local Properties**
Create `local.properties` in the project root:
```properties
sdk.dir=/path/to/your/Android/sdk
```

4. **Build the Project**
```bash
# From command line
./gradlew assembleDebug

# Or use Android Studio
# Build > Make Project
```

### Running Tests

```bash
# Unit tests
./gradlew test

# Instrumented tests
./gradlew connectedAndroidTest

# All tests
./gradlew check
```

## Deployment

### 1. Release Preparation

1. **Update Version**
In `app/build.gradle`:
```gradle
android {
    defaultConfig {
        versionCode 1
        versionName "1.0.0"
    }
}
```

2. **Configure Signing**
Create `keystore.properties`:
```properties
storeFile=/path/to/keystore.jks
storePassword=your_store_password
keyAlias=your_key_alias
keyPassword=your_key_password
```

3. **ProGuard Configuration**
Enable in `app/build.gradle`:
```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'),
                         'proguard-rules.pro'
        }
    }
}
```

### 2. Building Release Version

```bash
# Generate signed APK
./gradlew assembleRelease

# Generate Android App Bundle
./gradlew bundleRelease
```

### 3. Testing Release Build

1. Install on test devices
2. Verify all features
3. Check performance
4. Validate offline functionality
5. Test edge cases

### 4. Play Store Deployment

1. Create Play Store listing
2. Upload App Bundle/APK
3. Configure store listing
4. Set up pricing
5. Submit for review

## Continuous Integration

### GitHub Actions Workflow

```yaml
name: Android CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK
        uses: actions/setup-java@v2
        with:
          java-version: '11'
          distribution: 'adopt'
      - name: Build with Gradle
        run: ./gradlew build
      - name: Run Tests
        run: ./gradlew test
```

## Performance Optimization

1. **Image Loading**
   - Glide for efficient image loading
   - Memory and disk caching
   - Image size optimization

2. **Database Operations**
   - Room for efficient data access
   - Background thread operations
   - Pagination for large datasets

3. **Network Requests**
   - Retrofit with OkHttp
   - Request caching
   - Compression

4. **UI Performance**
   - ViewHolder pattern
   - Layout optimization
   - Resource optimization

## Security

1. **Data Storage**
   - Encrypted SharedPreferences
   - Room database encryption
   - File-level encryption

2. **Network Security**
   - SSL pinning
   - Certificate validation
   - Request signing

3. **Code Security**
   - ProGuard obfuscation
   - API key protection
   - Input validation

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 