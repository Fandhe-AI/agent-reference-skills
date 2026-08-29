---
source: https://tanstack.com/table/latest/docs/devtools
---

# Devtools

Framework-specific devtools adapters plug into the TanStack Devtools multi-panel UI to inspect registered table instances, switch between multiple tables, and inspect features, state, options, rows, and columns in real time.

## Signature / Usage

```sh
npm install @tanstack/react-devtools @tanstack/react-table-devtools
```

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { useTable } from '@tanstack/react-table'
import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  tableDevtoolsPlugin,
  useTanStackTableDevtools,
} from '@tanstack/react-table-devtools'

function App() {
  const table = useTable({
    key: 'users-table', // needed for devtools
    // ...
  })

  useTanStackTableDevtools(table)

  return <AppContent table={table} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <TanStackDevtools plugins={[tableDevtoolsPlugin()]} />
  </React.StrictMode>,
)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `key` (table option) | `string` | Required to register a table with devtools. The devtools identify each table by `key`; without it registration is skipped and an error is logged. Also shown as the label in the devtools panel selector |
| `enabled` | `boolean` | Accepted by each registration function (`useTanStackTableDevtools`, `injectTanStackTableDevtools`, ...) to conditionally register a table, e.g. `useTanStackTableDevtools(table, { enabled: false })` |

## Notes

- Required packages per framework: React (`@tanstack/react-devtools` + `@tanstack/react-table-devtools`), Preact, Vue, Solid, Angular have equivalents. Octane, Lit, Svelte, Alpine, and vanilla currently ship no dedicated table devtools adapter.
- By default the live devtools only run in development mode; production builds export no-op implementations unless you import from the `/production` entrypoint (e.g. `@tanstack/react-table-devtools/production`).
- Registering multiple tables shows a selector in the Table panel to switch between them.

## Related

- [React Quick Start](./quick-start.md)
