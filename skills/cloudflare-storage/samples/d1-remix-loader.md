---
source: https://developers.cloudflare.com/d1/examples/d1-and-remix/
---

# Query D1 from Remix

Query D1 in a Remix `loader` through `context.cloudflare.env.DB` and render it with `useLoaderData`.

```ts
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface Env {
  DB: D1Database;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.cloudflare.env as Env;

  try {
    let { results } = await env.DB.prepare("SELECT * FROM users LIMIT 5").run();
    return json(results);
  } catch (error) {
    return json({ error: "Failed to fetch users" }, { status: 500 });
  }
};

export default function Index() {
  const results = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <div>
        A value from D1:
        <pre>{JSON.stringify(results)}</pre>
      </div>
    </div>
  );
}
```

## Notes

- The official page states Remix is no longer recommended for new projects and points to React Router: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router
- Remix on Pages setup: https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/. Local dev needs `--d1 DB=<DATABASE_ID>` on `wrangler dev`.
- Related: [D1 README](../references/d1/README.md), [prepared-statements](../references/d1/prepared-statements.md).
