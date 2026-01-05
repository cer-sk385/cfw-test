import { Hono } from 'hono';
import testHtml from './test.html';

const app = new Hono();

app.get('/message', (c) => c.text('Hello, World!'));

app.get('/random', (c) => c.text(crypto.randomUUID()));

app.get('/test.html', (c) => c.html(testHtml));

export default app;
