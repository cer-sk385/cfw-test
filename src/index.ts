import testHtml from './test.html';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/message':
				return new Response('Hello, World!');
			case '/random':
				return new Response(crypto.randomUUID());
			case '/test.html':
				return new Response(testHtml, {
					headers: { 'Content-Type': 'text/html; charset=utf-8' },
				});
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
