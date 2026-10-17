---
source: https://react.dev/reference/react-dom/server
---

# Server React DOM APIs

The `react-dom/server` APIs let you server-side render React components to HTML. These APIs are only used on the server at the top level of your app to generate the initial HTML. A framework may call them for you. Most of your components don't need to import or use them.

## Signature / Usage

```js
import {
  renderToReadableStream,
  resume,
  renderToPipeableStream,
  resumeToPipeableStream,
  renderToString,
  renderToStaticMarkup,
} from 'react-dom/server';
```

| API | Environment | Description |
|-----|-------------|-------------|
| [renderToReadableStream](./renderToReadableStream.md) | Web Streams | Renders a React tree to a Readable Web Stream |
| [resume](./resume.md) | Web Streams | Resumes `prerender` to a Readable Web Stream |
| [renderToPipeableStream](./renderToPipeableStream.md) | Node.js Streams | Renders a React tree to a pipeable Node.js Stream |
| [resumeToPipeableStream](./resumeToPipeableStream.md) | Node.js Streams | Resumes `prerenderToNodeStream` to a pipeable Node.js Stream |
| [renderToString](./renderToString.md) | Non-streaming (legacy) | Renders a React tree to a string |
| [renderToStaticMarkup](./renderToStaticMarkup.md) | Non-streaming (legacy) | Renders a non-interactive React tree to a string |

## Notes

- Web Streams APIs are only available in environments with Web Streams, which includes browsers, Deno, and some modern edge runtimes.
- Node.js also includes the Web Streams methods for compatibility, but they are not recommended due to worse performance. Use the dedicated Node.js APIs instead.
- The legacy APIs (`renderToString`, `renderToStaticMarkup`) can be used in environments that don't support streams. They have limited functionality compared to the streaming APIs.

## Related

- [Static React DOM APIs](./static-overview.md)
- [hydrateRoot](../dom-apis/hydrateRoot.md)
