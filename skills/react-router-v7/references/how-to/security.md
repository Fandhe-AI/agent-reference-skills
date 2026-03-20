# Security

Key security considerations for React Router applications, focusing on Content Security Policy (CSP) nonce configuration.

## 実装方法

To implement CSP with `unsafe-inline`, generate a cryptographically random nonce per request server-side and pass it to all React Router APIs that emit inline `<script>` tags.

## コード例

```tsx
// root.tsx
export default function Root({ nonce }: { nonce: string }) {
  return (
    <html>
      <head>
        <Scripts nonce={nonce} />
        <ScrollRestoration nonce={nonce} />
      </head>
      <body />
    </html>
  );
}
```

```tsx
// entry.server.tsx
export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
) {
  const nonce = generateNonce(); // cryptographically random, per-request

  const stream = await renderToPipeableStream(
    <ServerRouter context={routerContext} nonce={nonce} />,
    { nonce },
  );
  // ...
}
```

## 注意点

- Apply `nonce` to: `<Scripts>`, `<ScrollRestoration>`, `<ServerRouter>`, and the `renderToPipeableStream` / `renderToReadableStream` options
- The nonce must be unique per HTTP request — never reuse nonces
- This guide covers CSP only; consult the OWASP guidelines for a comprehensive security checklist

## 関連

- [./headers.md](./headers.md)
