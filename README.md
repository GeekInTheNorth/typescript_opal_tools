# TypeScript Opal Tools

An Optimizely Opal Tools application built with TypeScript and the [Optimizely Opal Tools SDK](https://www.npmjs.com/package/@optimizely-opal/opal-tools-sdk).

## Overview

This project demonstrates how to create custom tools for Optimizely Opal using TypeScript. Custom tools extend Opal's AI assistant functionality, allowing you to integrate with internal systems, automate workflows, and provide specialized capabilities.

## Features

- **TypeScript Support**: Full type safety with TypeScript decorators
- **Express Integration**: Built on Express.js for flexible deployment
- **Serverless Ready**: Configured for Vercel deployment
- **Discovery Endpoint**: Automatic `/discovery` endpoint for Opal integration
- **Sample Tool**: Includes a greeting tool example to get you started

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- An Optimizely Opal account (for tool registration)

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The server will start on port 3000 (or the PORT environment variable). Access the discovery endpoint at:
- http://localhost:3000/discovery

### Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Production

Run the compiled application:

```bash
npm start
```

## Project Structure

```
.
├── api/
│   ├── index.ts           # Express app setup and tool registration
│   └── greeting-tool.ts   # Sample greeting tool implementation
├── .env.example           # Environment variable template
├── .gitignore            # Git ignore rules
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment configuration
```

## Creating Custom Tools

Tools are created using TypeScript decorators from the Opal Tools SDK:

```typescript
import { tool, ParameterType } from '@optimizely-opal/opal-tools-sdk';

@tool({
  name: 'my_tool',
  description: 'Description of what the tool does',
  parameters: [
    {
      name: 'param_name',
      type: ParameterType.String,
      description: 'Parameter description',
      required: true
    }
  ]
})
export class MyTool {
  async execute(params: { param_name: string }): Promise<any> {
    // Tool implementation
    return { result: 'success' };
  }
}
```

Register your tool in `api/index.ts`:

```typescript
import { MyTool } from './my-tool';
toolsService.registerTool(MyTool);
```

## Deployment

### Vercel

This project is configured for Vercel deployment:

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`

### Other Platforms

You can deploy to any platform that supports Node.js:
- AWS Lambda
- Azure Functions
- Google Cloud Functions
- Self-hosted server

## Registering with Optimizely Opal

1. Deploy your application to a public URL
2. In Optimizely Opal, navigate to Tools > Registries
3. Add your discovery endpoint URL (e.g., `https://your-app.vercel.app/discovery`)
4. Configure authentication if required
5. Your tools will now be available in Opal

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PORT`: Server port (default: 3000)
- `BEARER_TOKEN`: Optional authentication token

## Documentation

- [Optimizely Opal Tools SDK](https://www.npmjs.com/package/@optimizely-opal/opal-tools-sdk)
- [Custom Tools Overview](https://support.optimizely.com/hc/en-us/articles/39189641171981-Custom-tools-overview)
- [Add Custom Tool to Opal](https://support.optimizely.com/hc/en-us/articles/39195307678221-Add-a-custom-tool-to-Optimizely-Opal)

## License

ISC
