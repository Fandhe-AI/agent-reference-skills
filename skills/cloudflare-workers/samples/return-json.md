---
source: https://developers.cloudflare.com/workers/examples/return-json/
---

# Return JSON

Return JSON directly from a Worker, e.g. for APIs and middleware.

```js
export default {
  async fetch(request) {
    const data = {
      hello: "world",
    };

    return Response.json(data);
  },
};
```

## Notes

- `Response.json(data)` serializes and sets `content-type: application/json`.
