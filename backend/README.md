# Restaurant API

A .NET 10 Minimal API that serves restaurant food data from a SQL Server database using Entity Framework Core.

## Prerequisites

- .NET 10 SDK installed
- Docker Desktop installed and running (for SQL Server)

## Project Structure

```
backend/
├── RestaurantApi.csproj
├── Program.cs                      # Minimal API setup, CRUD endpoints, CORS, Swagger
├── docker-compose.yml              # SQL Server container configuration
├── appsettings.json                # Application configuration
├── appsettings.Development.json    # Development configuration with connection string
├── Models/
│   └── Food.cs                     # Food entity class
├── Data/
│   ├── FoodData.cs                 # Seed data (21 items)
│   ├── RestaurantDbContext.cs      # EF Core DbContext
│   └── RestaurantDbContextFactory.cs # Design-time DbContext factory
└── Migrations/
    └── [timestamp]_InitialCreate.cs # Initial database migration
```

## Getting Started

### 1. Start SQL Server in Docker

From the backend directory:

```bash
cd backend
docker-compose up -d
```

Wait ~30 seconds for SQL Server to fully initialize. Verify it's running:

```bash
docker ps | grep restaurant-sqlserver
```

### 2. Restore Dependencies

```bash
dotnet restore
```

### 3. Run the API

```bash
dotnet run
```

The API will:

- Automatically apply EF Core migrations on startup
- Seed the database with 21 food items if empty
- Start on `http://localhost:5000`

### Stop the Database

When done:

```bash
docker-compose down
```

To delete all data:

```bash
docker-compose down -v
```

## API Endpoints

### GET /foods

Returns all food items from the database.

```bash
curl http://localhost:5000/foods
```

### GET /foods/{id}

Returns a specific food item by ID.

```bash
curl http://localhost:5000/foods/1
```

### POST /foods

Creates a new food item.

```bash
curl -X POST http://localhost:5000/foods \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Dish",
    "image": "new-dish.jpg",
    "price": 12.99,
    "description": "A delicious new dish",
    "tags": ["Lunch", "Dinner"]
  }'
```

### PUT /foods/{id}

Updates an existing food item.

```bash
curl -X PUT http://localhost:5000/foods/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Burger",
    "image": "burger.jpg",
    "price": 9.99,
    "description": "Updated description",
    "tags": ["Lunch", "Dinner"]
  }'
```

### DELETE /foods/{id}

Deletes a food item.

```bash
curl -X DELETE http://localhost:5000/foods/1
```

### GET /health

Health check endpoint.

```bash
curl http://localhost:5000/health
```

## Swagger Documentation

Once the API is running, you can access the Swagger UI at:

- http://localhost:5000/swagger

## Features

- **SQL Server Database**: Runs in Docker container with persistent storage
- **Entity Framework Core**: ORM for database operations with automatic migrations
- **Full CRUD API**: Create, Read, Update, Delete operations for food items
- **Data Seeding**: Automatically seeds 21 food items on first run
- **CORS**: Configured to allow requests from frontend
- **Swagger/OpenAPI**: Interactive API documentation at `/swagger`

## Database Management

### View Migrations

```bash
dotnet ef migrations list
```

### Create a New Migration

```bash
dotnet ef migrations add MigrationName
```

### Remove Last Migration (if not applied)

```bash
dotnet ef migrations remove
```

### Docker Commands

```bash
# View logs
docker logs restaurant-sqlserver

# Restart container
docker-compose restart

# Stop and remove everything (deletes data)
docker-compose down -v
```

### Connect to SQL Server (Optional)

If you have `sqlcmd` installed:

```bash
sqlcmd -S localhost,1433 -U sa -P 'YourStrong@Passw0rd' \
  -Q "SELECT * FROM RestaurantDb.dbo.Foods"
```

Or use a GUI tool like the SQL Server extension in VS Code or SQL Server Management Studio with:

- Server: `localhost,1433`
- User: `sa`
- Password: `YourStrong@Passw0rd`
- Database: `RestaurantDb`
