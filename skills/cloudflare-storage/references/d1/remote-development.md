---
source: https://developers.cloudflare.com/d1/best-practices/remote-development/
---

# Remote development

D1 supports remote development using the Workers dashboard playground, a browser version of Visual Studio Code.

## Signature / Usage

Bind a D1 database in the dashboard (Workers & Pages > Worker > Bindings > Add binding > D1 database, with a variable name such as `DB`), then select Edit Code. Verify access with:

```js
export default {
  async fetch(request, env, ctx) {
    const res = await env.DB.prepare("SELECT 1;").run();
    return new Response(JSON.stringify(res, null, 2));
  },
};
```

## Notes

- Assumes a Worker and a D1 database already exist.

## Related

- [Local development](./local-development.md)
- [Debug D1](./debug-d1.md)
- [Getting started](./get-started.md)
