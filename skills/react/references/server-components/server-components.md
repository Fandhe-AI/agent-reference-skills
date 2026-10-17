---
source: https://react.dev/reference/rsc/server-components
---

# Server Components

Server Components are a new type of Component that renders ahead of time, before bundling, in an environment separate from your client app or SSR server.

## Signature / Usage

Server Components can be async functions and `await` during render. Interactivity comes from composing them with Client Components (`"use client"`).

```js
import marked from 'marked'; // Not included in bundle
import sanitizeHtml from 'sanitize-html'; // Not included in bundle

async function Page({page}) {
  // NOTE: loads *during* render, when the app is built.
  const content = await file.readFile(`${page}.md`);

  return <div dangerouslySetInnerHTML={{__html: sanitizeHtml(marked(content))}} />;
}
```

Reading data in a Server Component with a web server (no API layer needed):

```js
import db from './database';

async function Note({id}) {
  // NOTE: loads *during* render.
  const note = await db.notes.get(id);
  return (
    <div>
      <Author id={note.authorId} />
      <p>{note.content}</p>
    </div>
  );
}

async function Author({id}) {
  // NOTE: loads *after* Note,
  // but is fast if data is co-located.
  const author = await db.authors.get(id);
  return <span>By: {author.name}</span>;
}
```

### Rendering a context provider in a Server Component

Server Components cannot create context, but they can render a context provider imported from a Client Component module.

```js
// user-context.js
'use client';
import { createContext } from 'react';

export const UserContext = createContext(null);
```

```js
// server-component.js
import { UserContext } from './user-context';

export async function Layout({ children }) {
  const currentUser = await getCurrentUser();

  return (
    <UserContext value={currentUser}>
      {children}
    </UserContext>
  );
}
```

Client Components rendered inside this provider can read its value with `use` or `useContext`.

### Adding interactivity to Server Components

Server Components are not sent to the browser, so they cannot use interactive APIs like `useState`. To add interactivity, compose them with a Client Component using the `"use client"` directive.

```js
// Server Component
import Expandable from './Expandable';

async function Notes() {
  const notes = await db.notes.getAll();
  return (
    <div>
      {notes.map(note => (
        <Expandable key={note.id}>
          <p>{note.content}</p>
        </Expandable>
      ))}
    </div>
  )
}
```

```js
// Client Component
"use client"
import {useState} from 'react';

export default function Expandable({children}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
      >
        Toggle
      </button>
      {expanded && children}
    </div>
  )
}
```

### Async components with Server Components

When you `await` in an async component, React will suspend and wait for the promise to resolve before resuming rendering. This works across server/client boundaries with streaming support for Suspense. You can create a promise on the server and await it on the client:

```js
// Server Component
import db from './database';

async function Page({id}) {
  // Will suspend the Server Component.
  const note = await db.notes.get(id);

  // NOTE: not awaited, will start here and await on the client.
  const commentsPromise = db.comments.get(note.id);
  return (
    <div>
      <p>{note.content}</p>
      <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}
```

```js
// Client Component
"use client";
import {use} from 'react';

function Comments({commentsPromise}) {
  // NOTE: this will resume the promise from the server.
  // It will suspend until the data is available.
  const comments = use(commentsPromise);
  return comments.map(comment => <p>{comment}</p>);
}
```

## Notes

- The official example renders `{sanitizeHtml(marked(content))}` as a child, which React escapes as text; adjusted to `dangerouslySetInnerHTML` so the sanitized HTML is actually rendered.
- The `import {useState} from 'react';` line in the `Expandable` Client Component snippet is added; the original omits it.

- Snippets corrected from the original: note is a record object (note.authorId), so the examples render note.content instead of the object itself; the Expandable example passes it as children.
- While React Server Components in React 19 are stable and will not break between minor versions, the underlying APIs used to implement a React Server Components bundler or framework do not follow semver and may break between minors in React 19.x.
- To support React Server Components as a bundler or framework, pin to a specific React version, or use the Canary release.
- Server Components can run once at build time on your CI server, or for each request using a web server; a web server is not required when they run at build time.
- Only the rendered output reaches the client: the Server Component definitions and the libraries they use are not in the client bundle.
- There is no directive for Server Components. A common misunderstanding is that Server Components are denoted by `"use server"`, but `"use server"` is used for Server Functions.
- Since async components are not supported on the client, await the promise with `use` in Client Components.
- Rendering a Context imported from a `'use client'` module directly in a Server Component requires React 19.3+; earlier versions needed a client wrapper component (e.g. `UserProvider`) that renders the Context.
- Scope: this page is React's own Server Components specification. Next.js App Router specifics (`use cache`, file conventions) belong to nextjs-app, TanStack's `createServerFn` to tanstack-start, and React Router's RSC support to react-router.

## Related

- [Server Functions](./server-functions.md)
- [Directives](./directives.md)
- [use client](./use-client.md)
- [use server](./use-server.md)
- [use](../apis/use.md)
- [Suspense](../components/Suspense.md)
