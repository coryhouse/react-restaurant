#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";

interface Food {
  id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  tags: string[];
}

// API helper functions
async function fetchFoods(): Promise<Food[]> {
  const response = await fetch(`${API_BASE_URL}/foods`);
  if (!response.ok) {
    throw new Error(`Failed to fetch foods: ${response.statusText}`);
  }
  return response.json();
}

async function fetchFoodById(id: number): Promise<Food> {
  const response = await fetch(`${API_BASE_URL}/foods/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch food ${id}: ${response.statusText}`);
  }
  return response.json();
}

async function createFood(food: Omit<Food, "id">): Promise<Food> {
  const response = await fetch(`${API_BASE_URL}/foods`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
  if (!response.ok) {
    throw new Error(`Failed to create food: ${response.statusText}`);
  }
  return response.json();
}

async function updateFood(id: number, food: Partial<Food>): Promise<Food> {
  const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(food),
  });
  if (!response.ok) {
    throw new Error(`Failed to update food ${id}: ${response.statusText}`);
  }
  return response.json();
}

async function deleteFood(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete food ${id}: ${response.statusText}`);
  }
}

// Create MCP server
const server = new Server(
  {
    name: "react-restaurant-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  try {
    const foods = await fetchFoods();
    return {
      resources: [
        {
          uri: "restaurant://foods",
          mimeType: "application/json",
          name: "All Foods",
          description: "List of all food items in the restaurant menu",
        },
        ...foods.map((food) => ({
          uri: `restaurant://foods/${food.id}`,
          mimeType: "application/json",
          name: food.name,
          description: `${food.tags.join(", ")} - $${food.price}`,
        })),
      ],
    };
  } catch (error) {
    return {
      resources: [
        {
          uri: "restaurant://foods",
          mimeType: "application/json",
          name: "All Foods",
          description: "List of all food items in the restaurant menu",
        },
      ],
    };
  }
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri.toString();

  if (uri === "restaurant://foods") {
    const foods = await fetchFoods();
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(foods, null, 2),
        },
      ],
    };
  }

  const match = uri.match(/^restaurant:\/\/foods\/(\d+)$/);
  if (match) {
    const id = parseInt(match[1], 10);
    const food = await fetchFoodById(id);
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(food, null, 2),
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_foods",
        description: "Get all food items from the restaurant menu",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_food",
        description: "Get a specific food item by ID",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "The ID of the food item",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "search_foods",
        description: "Search for food items by category or name",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description:
                "Filter by category (e.g., 'appetizer', 'main', 'dessert')",
            },
            name: {
              type: "string",
              description: "Search by name (partial match)",
            },
          },
        },
      },
      {
        name: "create_food",
        description: "Add a new food item to the menu",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the food item",
            },
            category: {
              type: "string",
              description: "Category (e.g., 'appetizer', 'main', 'dessert')",
            },
            price: {
              type: "number",
              description: "Price in dollars",
            },
            image: {
              type: "string",
              description: "Image filename (e.g., 'bruschetta.jpg')",
            },
            description: {
              type: "string",
              description: "Optional description of the food item",
            },
          },
          required: ["name", "category", "price", "image"],
        },
      },
      {
        name: "update_food",
        description: "Update an existing food item",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "The ID of the food item to update",
            },
            name: {
              type: "string",
              description: "New name",
            },
            category: {
              type: "string",
              description: "New category",
            },
            price: {
              type: "number",
              description: "New price",
            },
            image: {
              type: "string",
              description: "New image filename",
            },
            description: {
              type: "string",
              description: "New description",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "delete_food",
        description: "Remove a food item from the menu",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "The ID of the food item to delete",
            },
          },
          required: ["id"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_foods": {
        const foods = await fetchFoods();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(foods, null, 2),
            },
          ],
        };
      }

      case "get_food": {
        const id = (args?.id ?? 0) as number;
        const food = await fetchFoodById(id);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(food, null, 2),
            },
          ],
        };
      }

      case "search_foods": {
        const foods = await fetchFoods();
        let filtered = foods;

        if (args?.tags) {
          const tags = args.tags as string[];
          filtered = filtered.filter((f) =>
            f.tags.some((tag) => tags.includes(tag.toLowerCase()))
          );
        }

        if (args?.name) {
          const name = (args.name as string).toLowerCase();
          filtered = filtered.filter((f) =>
            f.name.toLowerCase().includes(name)
          );
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(filtered, null, 2),
            },
          ],
        };
      }

      case "create_food": {
        const newFood = await createFood({
          name: (args?.name ?? "") as string,
          price: (args?.price ?? 0) as number,
          image: (args?.image ?? "") as string,
          description: args?.description as string | undefined,
          tags: (args?.tags ?? []) as string[],
        });
        return {
          content: [
            {
              type: "text",
              text: `Food created successfully:\n${JSON.stringify(newFood, null, 2)}`,
            },
          ],
        };
      }

      case "update_food": {
        const id = (args?.id ?? 0) as number;
        const updates: Partial<Food> = {};
        if (args?.name) updates.name = args.name as string;
        if (args?.tags) updates.tags = args.tags as string[];
        if (args?.price) updates.price = args.price as number;
        if (args?.image) updates.image = args.image as string;
        if (args?.description) updates.description = args.description as string;

        const updatedFood = await updateFood(id, updates);
        return {
          content: [
            {
              type: "text",
              text: `Food updated successfully:\n${JSON.stringify(updatedFood, null, 2)}`,
            },
          ],
        };
      }

      case "delete_food": {
        const id = (args?.id ?? 0) as number;
        await deleteFood(id);
        return {
          content: [
            {
              type: "text",
              text: `Food item ${id} deleted successfully`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("React Restaurant MCP Server running on stdio");
  console.error(`API Base URL: ${API_BASE_URL}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
