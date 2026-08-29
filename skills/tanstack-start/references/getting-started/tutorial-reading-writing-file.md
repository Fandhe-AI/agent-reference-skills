---
source: https://tanstack.com/start/latest/docs/framework/react/tutorial/reading-writing-file
---

# Tutorial: Reading and Writing a File (DevJokes)

Full-stack tutorial building a "DevJokes" app: file-based JSON storage read/written via server functions, loader-driven data fetching, and a form to add jokes.

## Signature / Usage

Read server function:

```tsx
// src/serverActions/jokesActions.ts
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import type { JokesData } from '../types'

const JOKES_FILE = 'src/data/jokes.json'

export const getJokes = createServerFn({ method: 'GET' }).handler(async () => {
  const jokes = await fs.promises.readFile(JOKES_FILE, 'utf-8')
  return JSON.parse(jokes) as JokesData
})
```

Write server function with validation:

```tsx
export const addJoke = createServerFn({ method: 'POST' })
  .validator((data: { question: string; answer: string }) => {
    if (!data.question?.trim()) throw new Error('Joke question is required')
    if (!data.answer?.trim()) throw new Error('Joke answer is required')
    return data
  })
  .handler(async ({ data }) => {
    const jokesData = await getJokes()
    const newJoke = { id: uuidv4(), question: data.question, answer: data.answer }
    const updatedJokes = [...jokesData, newJoke]
    await fs.promises.writeFile(JOKES_FILE, JSON.stringify(updatedJokes, null, 2), 'utf-8')
    return newJoke
  })
```

Consuming via loader + invalidate:

```tsx
export const Route = createFileRoute('/')({
  loader: async () => getJokes(),
  component: App,
})

const App = () => {
  const jokes = Route.useLoaderData() || []
  return <JokesList jokes={jokes} />
}

// on submit
await addJoke({ data: { question, answer } })
router.invalidate() // re-runs the loader to refresh data
```

## Notes

- `createServerFn({ method: 'GET' })` for reads, `{ method: 'POST' })` for writes; `.validator()` runs before `.handler()`.
- `router.invalidate()` (from `useRouter()`) is the standard way to force a loader re-run after a mutation, since there is no `<Form>` API equivalent here.
- Tutorial scaffolds with `pnpx @tanstack/cli@latest create` and optional `--add-on` flags (Shadcn, Clerk, Convex, TanStack Query).
- Full code: https://github.com/shrutikapoor08/devjokes

## Related

- [Tutorial: Fetching Data from External API](./tutorial-fetching-external-api.md)
- [Build a Project from Scratch](./build-from-scratch.md)
