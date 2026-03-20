# Backend For Frontend (BFF)

An architectural pattern where React Router acts as a dedicated web server that connects your frontend to backend services, rather than having the browser communicate directly with multiple APIs.

**Availability**: Framework Mode only.

## 詳細説明

The BFF strategy uses a web server scoped to:
- Serve the frontend web application
- Act as a gateway to databases, mailers, job queues, existing REST/GraphQL APIs, and third-party services

This is particularly valuable when you have mature backend applications (Ruby, Elixir, PHP, etc.) and don't want to migrate them to JavaScript. API tokens and secrets stay server-side and never reach the client bundle.

**Full-Stack vs. BFF:**
- **Full-Stack**: React Router connects directly to a database/services via server-side JavaScript
- **BFF**: React Router connects to existing backend APIs while serving the frontend

## コード例

```typescript
import escapeHtml from "escape-html";

export async function loader() {
  const apiUrl = "https://api.example.com/some-data.json";
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  const data = await res.json();

  const prunedData = data.map((record) => {
    return {
      id: record.id,
      title: record.title,
      formattedBody: escapeHtml(record.content),
    };
  });
  return { prunedData };
}
```

## 注意点

- Use `fetch()` in **loaders** and **actions** — React Router handles server-side data fetching
- Only processed/pruned data is sent to the client (reduces kB transferred)
- Server code (like `escapeHtml`) does not need to manage UI async states
- `process.env` secrets are safe because they never enter the client bundle

## 関連

- [State Management](./state-management.md)
- [Progressive Enhancement](./progressive-enhancement.md)
