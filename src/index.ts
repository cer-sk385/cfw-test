import { Hono } from 'hono';
import testHtml from './test.html';
import memoHtml from './memo.html';

type Bindings = {
	AI: Ai;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/message', (c) => c.text('Hello, World!'));

app.get('/random', (c) => c.text(crypto.randomUUID()));

app.get('/test.html', (c) => c.html(testHtml));

app.get('/memo', (c) => c.html(memoHtml));

app.post('/api/memo-to-md', async (c) => {
	const { memo } = await c.req.json<{ memo: string }>();

	const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
		messages: [
			{
				role: 'system',
				content: `You are a helpful assistant that converts plain text notes into well-formatted Markdown.
Rules:
- Identify structure (headings, lists, emphasis)
- Use appropriate Markdown syntax
- Keep the original meaning
- Output ONLY the Markdown, no explanations
- Use Japanese if the input is in Japanese`,
			},
			{
				role: 'user',
				content: `Convert this memo to Markdown:\n\n${memo}`,
			},
		],
	});

	return c.json({ markdown: response.response });
});

export default app;
