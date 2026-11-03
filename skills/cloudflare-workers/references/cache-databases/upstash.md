---
source: https://developers.cloudflare.com/workers/databases/third-party-integrations/upstash/
---

# Upstash

Connect Workers to Upstash serverless Redis (HTTP client `@upstash/redis`) and Upstash QStash (task queue / scheduler).

## Signature / Usage

```sh
npx wrangler secret put UPSTASH_REDIS_REST_URL
npx wrangler secret put UPSTASH_REDIS_REST_TOKEN
npm i @upstash/redis
```

```js
import { Redis } from "@upstash/redis/cloudflare";

export default {
	async fetch(request, env) {
		const redis = Redis.fromEnv(env);

		const country = request.headers.get("cf-ipcountry");
		if (country) {
			const greeting = await redis.get(country);
			if (greeting) {
				return new Response(greeting);
			}
		}

		return new Response("Hello What's up!");
	},
};
```

QStash:

```sh
npx wrangler secret put QSTASH_TOKEN
npm i @upstash/qstash
```

## Notes

- `Redis.fromEnv(env)` reads the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` bindings from `env` (the secrets set above); `url` and `token` are the constructor option names of `new Redis({ url, token })`, not env var names. If you renamed the secrets, pass them explicitly with `new Redis({ url: env.<YOUR_URL_SECRET>, token: env.<YOUR_TOKEN_SECRET> })`.
- For receiving QStash webhooks in a Worker, follow Upstash's Cloudflare Workers quickstart (https://docs.upstash.com/qstash/quickstarts/cloudflare-workers#3-use-qstash-in-your-handler).
- This page covers connecting from a Worker. For Upstash products themselves (Redis, QStash, Vector, Kafka), see the upstash skill.
- Redis is a trademark of Redis Ltd.; use by Upstash is referential only.

## Related

- [connecting-to-databases.md](./connecting-to-databases.md)
- [third-party-integrations.md](./third-party-integrations.md)
