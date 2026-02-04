# Restaurant API

A .NET 9 Minimal API that serves restaurant food data.

## Prerequisites

- .NET 9 SDK installed

## Project Structure

```
backend/
├── RestaurantApi.csproj
├── Program.cs           # Minimal API setup, endpoints, CORS, Swagger
├── Models/
│   └── Food.cs          # Food record
└── Data/
    └── FoodData.cs      # Hardcoded food list (21 items)
```

## Getting Started

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

The API will start on `http://localhost:5000`

## API Endpoints

### GET /api/v1/foods

Returns all 21 food items as a JSON array.

**Example:**
```bash
curl http://localhost:5000/api/v1/foods
```

### GET /health

Health check endpoint.

**Example:**
```bash
curl http://localhost:5000/health
```

## Swagger Documentation

Once the API is running, you can access the Swagger UI at:
- http://localhost:5000/swagger

## Features

- **CORS**: Configured to allow requests from `http://localhost:5173` (frontend)
- **Swagger/OpenAPI**: Interactive API documentation
- **Hardcoded Data**: 21 food items with IDs converted from db.json format

## Verification Steps

1. Run `dotnet run` from the backend folder
2. Open http://localhost:5000/swagger to verify Swagger UI
3. Call GET http://localhost:5000/api/v1/foods - expect 21 food items
4. Call GET http://localhost:5000/health - expect "Healthy"
5. Verify CORS by calling from frontend (localhost:5173)
