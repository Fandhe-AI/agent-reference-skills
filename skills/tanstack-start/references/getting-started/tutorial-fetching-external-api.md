---
source: https://tanstack.com/start/latest/docs/framework/react/tutorial/fetching-external-api
---

# Tutorial: Fetching Data from External API

Tutorial integrating an external API (TMDB) into TanStack Start via a server function called from a route loader, keeping the API key server-side only.

## Signature / Usage

```ts
// src/routes/fetch-movies.tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import type { Movie, TMDBResponse } from '../types/movie'

const API_URL =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'

const fetchPopularMovies = createServerFn().handler(async (): Promise<TMDBResponse> => {
  const response = await fetch(API_URL, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_AUTH_TOKEN}`,
    },
  })
  if (!response.ok) throw new Error(`Failed to fetch movies: ${response.statusText}`)
  return response.json()
})

export const Route = createFileRoute('/fetch-movies')({
  component: MoviesPage,
  loader: async (): Promise<{ movies: Movie[]; error: string | null }> => {
    try {
      const moviesData = await fetchPopularMovies()
      return { movies: moviesData.results, error: null }
    } catch (error) {
      return { movies: [], error: 'Failed to load movies' }
    }
  },
})

const MoviesPage = () => {
  const { movies, error } = Route.useLoaderData()
  // render movies grid
}
```

## Notes

- `createServerFn()` (no options = defaults to GET) keeps `process.env.TMDB_AUTH_TOKEN` server-side; it is never sent to the client.
- The loader wraps the server function call in try/catch and always returns a valid `{ movies, error }` shape for the component.
- For interactive features (real-time updates, caching, infinite scrolling) the docs recommend TanStack Query on the client instead of loader-only fetching.
- Full code: https://github.com/shrutikapoor08/tanstack-start-movies

## Related

- [Tutorial: Reading and Writing a File](./tutorial-reading-writing-file.md)
