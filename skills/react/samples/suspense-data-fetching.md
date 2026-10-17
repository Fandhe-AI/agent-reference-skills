---
source: https://react.dev/reference/react/use#reading-a-promise-with-use
---

# Suspense Data Fetching with use

Read a cached Promise with `use` inside a `<Suspense>` boundary, with an error boundary for rejections.

`src/App.js`:

```js
import { use, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchData } from './data.js';

export default function App() {
  return (
    <ErrorBoundary fallback={<p>Could not fetch albums.</p>}>
      <Suspense fallback={<Loading />}>
        <Albums />
      </Suspense>
    </ErrorBoundary>
  );
}

function Albums() {
  const albums = use(fetchData('/albums'));
  return (
    <ul>
      {albums.map(album => (
        <li key={album.id}>
          {album.title} ({album.year})
        </li>
      ))}
    </ul>
  );
}

function Loading() {
  return <h2>Loading...</h2>;
}
```

`src/data.js`:

```js
// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map();

export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

async function getData(url) {
  if (url === '/albums') {
    return await getAlbums();
  } else {
    throw Error('Not implemented');
  }
}

async function getAlbums() {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });

  return [{
    id: 13,
    title: 'Let It Be',
    year: 1970
  }, {
    id: 12,
    title: 'Abbey Road',
    year: 1969
  }, {
    id: 11,
    title: 'Yellow Submarine',
    year: 1969
  }, {
    id: 10,
    title: 'The Beatles',
    year: 1968
  }];
}
```

## Notes

- The component that calls `use(promise)` suspends while the Promise is pending; the closest `<Suspense>` boundary above it shows its fallback.
- Rejected Promises propagate to the nearest Error Boundary. `react-error-boundary` here is a third-party package (the source sandbox pins `4.0.3`).
- Only data read from a source that activates a Suspense boundary, such as a Promise read with `use`, suspends during rendering. Suspense does not detect data fetched inside an Effect or event handler.
- Cache the Promise (here `fetchData`); the sample states that caching logic normally lives in a framework. Data loaders in TanStack Query (`useSuspenseQuery`), TanStack Router, and React Router are covered by their own skills.
