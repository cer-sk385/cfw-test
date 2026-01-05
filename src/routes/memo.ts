import { Hono } from 'hono';
import memoHtml from '../pages/memo.html';

type Bindings = {
  AI: Ai;
};

const memo = new Hono<{ Bindings: Bindings }>();

memo.get('/', (c) => c.html(memoHtml));

memo.post('/api/memo-to-md', async (c) => {
  const { memo: memoText } = await c.req.json<{ memo: string }>();

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
        content: `Convert this memo to Markdown:\n\n${memoText}`,
      },
    ],
  });

  return c.json({ markdown: response.response });
});

export default memo;
