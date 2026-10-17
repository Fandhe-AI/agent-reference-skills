---
source: https://react.dev/reference/react-dom/static
---

# Static React DOM APIs

The `react-dom/static` APIs let you generate static HTML for React components. They have limited functionality compared to the streaming APIs. A framework may call them for you. Most of your components don't need to import or use them.

## Signature / Usage

```js
import {
  prerender,
  resumeAndPrerender,
  prerenderToNodeStream,
  resumeAndPrerenderToNodeStream,
} from 'react-dom/static';
```

| API | Environment | Description |
|-----|-------------|-------------|
| [prerender](./prerender.md) | Web Streams | Renders a React tree to static HTML with a Readable Web Stream |
| [resumeAndPrerender](./resumeAndPrerender.md) | Web Streams | Continues a prerendered React tree to static HTML with a Readable Web Stream |
| [prerenderToNodeStream](./prerenderToNodeStream.md) | Node.js Streams | Renders a React tree to static HTML with a Node.js Stream |
| [resumeAndPrerenderToNodeStream](./resumeAndPrerenderToNodeStream.md) | Node.js Streams | Continues a prerendered React tree to static HTML with a Node.js Stream |

## Notes

- Web Streams methods are only available in environments with Web Streams, which includes browsers, Deno, and some modern edge runtimes.
- Node.js also includes the Web Streams methods for compatibility, but they are not recommended due to worse performance. Use the dedicated Node.js APIs instead.

## Related

- [Server React DOM APIs](./server-overview.md)
