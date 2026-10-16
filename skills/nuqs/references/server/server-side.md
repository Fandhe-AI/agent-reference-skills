# Server-side Usage

Type-safe parsing of URL search params on the server: `createLoader` (v2.3.0+) and `createSearchParamsCache` (Next.js app router).

## Signature / Usage

```tsx
import { parseAsFloat, createLoader } from 'nuqs/server'

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  latitude: parseAsFloat.withDefault(0),
  longitude: parseAsFloat.withDefault(0)
}

export const loadSearchParams = createLoader(coordinatesSearchParams)
```

```tsx
// Next.js (app router)
import type { SearchParams } from 'nuqs/server'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const { latitude, longitude } = await loadSearchParams(searchParams)
  return <Map lat={latitude} lng={longitude} />
}
```

```tsx
// Next.js (pages router)
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { latitude, longitude } = loadSearchParams(query)
  return { props: { ... } }
}
```

```tsx
// Remix / React Router
export function loader({ request }: LoaderFunctionArgs) {
  const { latitude, longitude } = loadSearchParams(request) // request.url works too
  return ...
}
```

```tsx
// API routes: App router, eg: app/api/location/route.ts
export async function GET(request: Request) {
  const { latitude, longitude } = loadSearchParams(request)
  // ...
}

// Pages router, eg: pages/api/location.ts
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { latitude, longitude } = loadSearchParams(request.query)
}
```

```tsx
// Client-side one-off parsing of non-reactive search params
loadSearchParams('https://example.com?latitude=42&longitude=12')
loadSearchParams(location.search)
loadSearchParams(new URL(...))
loadSearchParams(new URLSearchParams(...))
```

Strict mode (v2.5.0+):

```tsx
const loadSearchParams = createLoader({
  count: parseAsInteger.withDefault(0)
})

// Default: returns { count: 0 }
loadSearchParams('?count=banana')

// Strict mode: throws
loadSearchParams('?count=banana', { strict: true })
// [nuqs] Error while parsing query `banana` for key `count`
```

### createSearchParamsCache

Access search params in deeply nested Server Components without props drilling (Next.js app router, since v1.13.0).

```ts
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString
} from 'nuqs/server'
// Import from 'nuqs/server' to avoid the "use client" directive

export const searchParamsCache = createSearchParamsCache({
  q: parseAsString.withDefault(''),
  maxResults: parseAsInteger.withDefault(10)
})
```

```tsx
export default async function Page({ searchParams }: PageProps) {
  // Don't forget to call `parse` here.
  const { q: query } = await searchParamsCache.parse(searchParams)
  return (
    <div>
      <h1>Search Results for {query}</h1>
      <Results />
    </div>
  )
}

function Results() {
  const maxResults = searchParamsCache.get('maxResults')
  // or: const { q, maxResults } = searchParamsCache.all()
  return <span>Showing up to {maxResults} results</span>
}
```

Shorter URL keys via `urlKeys`:

```ts
export const coordinatesCache = createSearchParamsCache(coordinatesParsers, {
  urlKeys: {
    latitude: 'lat',
    longitude: 'lng'
  }
})
```

## Options / Props

`createLoader(keyMap, options?)` / `createSearchParamsCache(keyMap, options?)`:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `keyMap` | `Record<string, Parser>` | — | Mapping of keys to parsers |
| `options` | `object` | — | Optional |
| `options.strict` | `boolean` | `false` | Throw on invalid values instead of returning the default or `null` (v2.5.0+) |
| `options.urlKeys` | `Record<string, string>` | — | Maps variable names to shorter URL keys (`createSearchParamsCache`) |

Loader input types: fully qualified URL string, query string (`?lat=45&lng=5`), `URL`, `URLSearchParams`, `Request`, `Record<string, string | string[] | undefined>`, or a `Promise` of any of these (in which case a Promise is returned).

`createSearchParamsCache` methods:

| Name | Type | Description |
| --- | --- | --- |
| `.parse(searchParams, options?)` | method | Parses and stores params in the cache. Returns a Promise if the input is a Promise |
| `.get(key)` | method | Gets a single key's value |
| `.all()` | method | Gets all values as an object |

## Notes

- Loaders do not validate data. For positive integers or JSON objects of a given shape, feed the loader result to a schema validation library (e.g. Zod), or build validation into custom parsers.
- `createSearchParamsCache` is based on React's `cache` function: it is valid only for the current page render and only in Server Components (Next.js app router). In React Router / Remix, use `createLoader` in the loader with `request` or `request.url`.
- You may share parser declarations between the cache and `useQueryStates` for type safety in client components.
- Remix v2 is EOL: `nuqs/adapters/remix` will be removed in nuqs@3.0.0. React Router v6 is EOL: `nuqs/adapters/react-router/v6` (and the unpinned `nuqs/adapters/react-router`) will be removed in nuqs@3.0.0. Migrate to React Router v7 / v8.

## Related

- [Built-in parsers](../parsers/built-in.md)
- [Options](../options/README.md)
