# Tutorials (Next.js)

Two official Next.js walkthroughs: a minimal upsert/search app and a docs search bar fed by the crawler.

## Signature / Usage

Upsert route (`app/api/upsert/route.ts`):

```typescript
import { Search } from "@upstash/search"

const client = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN,
})

const index = client.index("my-index")

export async function POST() {
  await index.upsert([
    {
      id: "movie-1",
      content: {
        title: "Inception",
        description: "A thriller about dreams within dreams.",
      },
      metadata: { genre: "sci-fi", year: 2010 },
    },
  ])

  return new Response("OK")
}
```

Search route (`app/api/search/route.ts`):

```typescript
import { Search } from "@upstash/search"

const client = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN,
})

const index = client.index("my-index")

export async function POST(req: Request) {
  const { query } = (await req.json()) as { query: string }

  const results = await index.search({ query })

  return new Response(JSON.stringify(results))
}
```

Docs search bar (`app/components/search-bar.tsx`, uses a read-only token in `NEXT_PUBLIC_*` variables):

```typescript
"use client"

import { SearchBar } from "@upstash/search-ui"
import "@upstash/search-ui/dist/index.css"
import { Search } from "@upstash/search"
import { FileText } from "lucide-react"

const client = new Search({
  url: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_URL! ,
  token: process.env.NEXT_PUBLIC_UPSTASH_SEARCH_READONLY_TOKEN!,
})
// 👇 your search index name
const index = client.index<{ title: string }>("default")

export default function SearchComponent() {
  return (
    <div className="max-w-sm mt-24 mx-auto">
      <SearchBar.Dialog>
        <SearchBar.DialogTrigger placeholder="Search..." />

        <SearchBar.DialogContent>
          <SearchBar.Input placeholder="Type to search..." />
          <SearchBar.Results
            searchFn={(query) => {
              // 👇 100% type-safe: whatever you return here is
              // automatically typed as `result` below
              return index.search({ query, limit: 10, reranking: true })
            }}
          >
            {(result) => (
                <div key={result.id} onClick={() => {
                   window.open(result.metadata?.url as string, "_blank")
                 }}>
               <SearchBar.Result 
                 value={result.id} 
                 className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
               >
                <SearchBar.ResultIcon>
                    <FileText className="text-gray-600" />
                </SearchBar.ResultIcon>

                <SearchBar.ResultContent>
                  <SearchBar.ResultTitle>
                    {result.content.title}
                  </SearchBar.ResultTitle>
                  <p className="text-xs text-gray-500 mt-0.5">Docs</p>
                </SearchBar.ResultContent>
              </SearchBar.Result>
              </div>
            )}
          </SearchBar.Results>
        </SearchBar.DialogContent>
      </SearchBar.Dialog>
    </div>
  )
}
```

Setup commands:

```shell
npx create-next-app@latest search-app
cd search-app
npm install @upstash/search
```

```shell
npx create-next-app@latest search-docs-app
cd search-docs-app
npm install @upstash/search @upstash/search-ui lucide-react
```

## Options / Props

| Tutorial | Packages | Environment variables |
| --- | --- | --- |
| Next.js Search Quickstart | `@upstash/search` | `UPSTASH_SEARCH_REST_URL`, `UPSTASH_SEARCH_REST_TOKEN` |
| Docs Search Quickstart | `@upstash/search`, `@upstash/search-ui`, `lucide-react` | `NEXT_PUBLIC_UPSTASH_SEARCH_URL`, `NEXT_PUBLIC_UPSTASH_SEARCH_READONLY_TOKEN` |

## Notes

- Both tutorials carry the warning that creating new Upstash Search databases is no longer supported; for new projects the official docs point to Upstash Vector
- The docs search bar tutorial fills the index by running `npx @upstash/search-crawler` and answering its prompts: Search URL, REST token, index name (`default` for convenience; change `client.index("default")` otherwise) and the docs URL to crawl (the tutorial uses `https://upstash.com/docs`)
- The quickstart page component (`app/page.tsx`, a client component with an "Upsert Data" button and a search box that POSTs to `/api/search`) and the Docs landing page layout are plain React/Tailwind and are not reproduced here
- Both walk-throughs start with `npm run dev` and open `http://localhost:3000`
- The SDK shape used here (`new Search`, `client.index`, `index.upsert`, `index.search`) is the one described in ts-sdk-overview.md
- Source: https://upstash.com/docs/search/tutorials/nextjs , https://upstash.com/docs/search/tutorials/buildsearchbar (fetched 2026-11-14; no version pin on the site)

## Related

- [getting-started.md](./getting-started.md)
- [ts-sdk-overview.md](./ts-sdk-overview.md)
- [search-ui.md](./search-ui.md)
- [tools.md](./tools.md)
- [docusaurus.md](./docusaurus.md)
