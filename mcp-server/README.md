# React Restaurant MCP Server

Model Context Protocol (MCP) server for the React Restaurant API. Provides tools and resources to interact with the restaurant menu system.

## Features

### Resources

- `restaurant://foods` - List all food items
- `restaurant://foods/{id}` - Get specific food item

### Tools

- `list_foods` - Get all food items
- `get_food` - Get a specific food by ID
- `search_foods` - Search foods by category or name
- `create_food` - Add new food item
- `update_food` - Update existing food item
- `delete_food` - Remove food item

## Installation

1. Install dependencies:

```bash
cd mcp-server
npm install
```

2. Build the server:

```bash
npm run build
```

## Configuration

### Claude Desktop

Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "react-restaurant": {
      "command": "node",
      "args": ["/absolute/path/to/react-restaurant/mcp-server/dist/index.js"],
      "env": {
        "API_BASE_URL": "http://localhost:3001"
      }
    }
  }
}
```

Replace `/absolute/path/to/react-restaurant` with the actual path to your project.

### Environment Variables

- `API_BASE_URL` - Base URL for the API (default: `http://localhost:3001`)

## Usage

### Prerequisites

Make sure your JSON Server API is running:

```bash
npm run start:api
```

### With Claude Desktop

1. Configure the MCP server in Claude Desktop (see Configuration above)
2. Restart Claude Desktop
3. The server will automatically connect
4. Use tools via natural language:
   - "List all foods in the menu"
   - "Create a new dessert called Tiramisu for $8.99"
   - "Update food item 5 to cost $12.99"
   - "Search for appetizers"

### Development

Watch mode for development:

```bash
npm run dev
```

## Examples

### List all foods

```
Please list all the foods in the restaurant menu.
```

### Search foods

```
Show me all the desserts.
```

### Create a food item

```
Add a new appetizer called "Garlic Bread" priced at $5.99 with image "garlic-bread.jpg".
```

### Update a food item

```
Update food item 3 to cost $14.99.
```

### Delete a food item

```
Remove food item 10 from the menu.
```

## Troubleshooting

**Server not connecting:**

- Ensure the path in claude_desktop_config.json is absolute
- Verify the server is built (`npm run build`)
- Check Claude Desktop logs

**API errors:**

- Confirm JSON Server is running on port 3001
- Check `API_BASE_URL` environment variable
- Verify network connectivity to localhost:3001

**TypeScript errors:**

- Run `npm run build` to see detailed errors
- Ensure all dependencies are installed
