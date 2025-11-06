import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { ToolsService } from '@optimizely-opal/opal-tools-sdk';

const app = express();
app.use(express.json());

// Initialize the Tools Service FIRST (before importing tools)
const toolsService = new ToolsService(app);

// Import tools AFTER service is created (this triggers the decorators)
import './greeting-tool';

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server (for local development)
const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Discovery endpoint available at http://localhost:${PORT}/discovery`);
  });
}

// Export for serverless deployment (e.g., Vercel)
export default app;
