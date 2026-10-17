# Search UI (@upstash/search-ui)

Pre-styled, accessible React search component (`SearchBar`) that is provider agnostic; the documented example uses Upstash Search as the backend.

## Signature / Usage

```bash
npm install @upstash/search-ui
```

```tsx
"use client"

import { SearchBar } from "@upstash/search-ui"
import "@upstash/search-ui/dist/index.css"

import { Search } from "@upstash/search"
import { FileText } from "lucide-react"

const client = new Search({
  url: "<UPSTASH_SEARCH_URL>",
  token: "<YOUR_SEARCH_READONLY_TOKEN>",
})

// your search index name
const index = client.index<{ title: string }>("movies")

export default function Page() {
  return (
    <div className="max-w-sm mt-24 mx-auto">
      <SearchBar.Dialog>
        <SearchBar.DialogTrigger placeholder="Search movies..." />

        <SearchBar.DialogContent>
          <SearchBar.Input placeholder="Type to search movies..." />
          <SearchBar.Results
            searchFn={(query) => {
              // whatever you return here is automatically typed as `result` below
              return index.search({ query, limit: 10, reranking: true })
            }}
          >
            {(result) => (
              <SearchBar.Result value={result.id} key={result.id}>
                <SearchBar.ResultIcon>
                  <FileText className="text-gray-600" />
                </SearchBar.ResultIcon>

                <SearchBar.ResultContent>
                  <SearchBar.ResultTitle>
                    {result.content.title}
                  </SearchBar.ResultTitle>
                  <p className="text-xs text-gray-500 mt-0.5">Movie</p>
                </SearchBar.ResultContent>
              </SearchBar.Result>
            )}
          </SearchBar.Results>
        </SearchBar.DialogContent>
      </SearchBar.Dialog>
    </div>
  )
}
```

Handling results with `onSelect`:

```tsx
<SearchBar.Result
  onSelect={() => {
    console.log(result)
  }}
  value={result.id}
  key={result.id}
>
```

Customization via normal React props (`className`, `highlightClassName`):

```tsx
<SearchBar.Input
  className="focus:ring-red-500"
  placeholder="Type to search movies..."
/>

<SearchBar.ResultTitle
  className="font-medium text-gray-900"
  highlightClassName="decoration-red-500 text-red-500"
>
  {result.content.title}
</SearchBar.ResultTitle>
```

## Notes

- Components used: `SearchBar.Dialog`, `DialogTrigger`, `DialogContent`, `Input`, `Results` (`searchFn` prop), `Result`, `ResultIcon`, `ResultContent`, `ResultTitle`.
- Use a read-only token in the frontend (safe to expose); with Next.js, set it as `NEXT_PUBLIC_YOUR_READONLY_TOKEN` in `.env`. Optionally handle search in a separate backend API.
- Based on the Radix UI Dialog primitive and cmdk.
- Creating new Upstash Search databases is no longer supported; for new projects the official docs recommend Upstash Vector.
- This is Upstash Search, distinct from Upstash Redis Search (a full-text extension inside Upstash Redis).
- Source: https://upstash.com/docs/search/ui/search-bar (fetched 2026-10).

## Related

- [search.md](./search.md)
- [reranking.md](./reranking.md)
- [ts-sdk-overview.md](./ts-sdk-overview.md)
