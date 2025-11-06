# Node.js TypeScript Web Server

A modern Node.js web server built with TypeScript and Express.js, featuring a clean project structure and RESTful API endpoints.

## Features

- ✅ TypeScript for type safety
- 🚀 Express.js web server
- 📡 RESTful API endpoints
- 🔧 JSON middleware support
- 📦 Clean build process
- 🌐 Health check endpoint

## Prerequisites

- Node.js 18+ 
- npm

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Development mode** (runs with ts-node for fast iteration)
   ```bash
   npm run dev
   ```
   Server will start on **http://localhost:3000**

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Run the compiled application**
   ```bash
   npm start
   ```

## API Endpoints

The server provides the following REST API endpoints:

- **GET /** - Welcome message and available endpoints
- **GET /health** - Health check endpoint
- **GET /users** - Get all users
- **GET /users/:id** - Get user by ID
- **POST /users** - Create a new user (requires name and email in JSON body)

### Example API Usage

```bash
# Get all users
curl http://localhost:3000/users

# Get user by ID
curl http://localhost:3000/users/1

# Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Smith", "email": "jane@example.com"}'

# Health check
curl http://localhost:3000/health
```

## Project Structure

```
├── src/                 # TypeScript source files
│   └── index.ts        # Main application entry point
├── dist/               # Compiled JavaScript output (generated)
├── .github/            # GitHub configuration
│   └── copilot-instructions.md
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md          # This file
```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled web server
- `npm run dev` - Run in development mode with ts-node
- `npm run dev:watch` - Run in development mode with auto-restart on file changes
- `npm run watch` - Compile TypeScript in watch mode
- `npm run clean` - Remove compiled output

## TypeScript Configuration

The project uses strict TypeScript settings for maximum type safety:
- Strict null checks
- No implicit any
- No unused locals
- And more strict compiler options

## Development

The web server includes:
- **Express.js** for robust web server functionality
- **User Management API** with CRUD operations
- **JSON middleware** for parsing request bodies
- **Error handling** with proper HTTP status codes
- **Health check endpoint** for monitoring
- **TypeScript interfaces** for type safety

The server starts with a sample user (John Doe) and provides endpoints to manage users through a RESTful API.

## Port Configuration

The server runs on **port 3000** by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=8080 npm run dev
```

Feel free to modify `src/index.ts` to add more endpoints and functionality!