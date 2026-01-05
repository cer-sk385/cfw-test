import { Hono } from 'hono';
import memo from './routes/memo';

const app = new Hono();

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));

// Memo routes at root
app.route('/', memo);

export default app;
