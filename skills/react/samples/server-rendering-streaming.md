---
source: https://react.dev/reference/react-dom/server/renderToPipeableStream#rendering-a-react-tree-as-html-to-a-nodejs-stream
---

# Server Rendering with Streaming

Render a React tree to a Node.js stream with `renderToPipeableStream`, then hydrate the document on the client.

Server:

```js
import { renderToPipeableStream } from 'react-dom/server';

// The route handler syntax depends on your backend framework
app.use('/', (request, response) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ['/main.js'],
    onShellReady() {
      response.setHeader('content-type', 'text/html');
      pipe(response);
    }
  });
});
```

Client (`/main.js`):

```js
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';

hydrateRoot(document, <App />);
```

Stream slow content by wrapping it in `<Suspense>`:

```js
function ProfilePage() {
  return (
    <ProfileLayout>
      <ProfileCover />
      <Sidebar>
        <Friends />
        <Photos />
      </Sidebar>
      <Suspense fallback={<PostsGlimmer />}>
        <Posts />
      </Suspense>
    </ProfileLayout>
  );
}
```

## Notes

- The root component must return the entire document including the root `<html>` tag; React injects the doctype and the bootstrap `<script>` tags.
- React sends the fallback (`PostsGlimmer`) first, then the remaining HTML with an inline `<script>` that replaces it once `Posts` finishes loading.
- Only data read from a source that activates a Suspense boundary, such as a Promise read with `use`, suspends during rendering; Suspense does not detect data fetched inside an Effect or event handler.
- `app.use` is a placeholder for your backend framework's route handler. Framework-level SSR is covered by the nextjs-app, tanstack-start, and react-router skills.
