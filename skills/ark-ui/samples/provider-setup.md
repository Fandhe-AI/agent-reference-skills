# Provider Setup

Wrap the app with `EnvironmentProvider` and `LocaleProvider` to support iframes/Shadow DOM and locale-aware formatting.

```tsx
import { EnvironmentProvider } from '@ark-ui/react/environment'
import { LocaleProvider } from '@ark-ui/react/locale'

export const App = () => {
  return (
    <EnvironmentProvider>
      <LocaleProvider locale="de-DE">
        {/* Your App */}
      </LocaleProvider>
    </EnvironmentProvider>
  )
}
```

```tsx
// Reading provider context from a descendant component
import { useEnvironmentContext } from '@ark-ui/react/environment'
import { useLocaleContext } from '@ark-ui/react/locale'

function Info() {
  const { getRootNode } = useEnvironmentContext()
  const { locale, dir } = useLocaleContext()
  return <pre>{JSON.stringify({ locale, dir }, null, 2)}</pre>
}
```

## Notes

- `EnvironmentProvider` auto-detects the current environment; pass a `value` prop (Document, or a function returning the root node) for iframes or Shadow DOM.
- `LocaleProvider`'s `dir` (text direction) is derived automatically from `locale`.
- Without `LocaleProvider`, components default to `en-US` and `ltr`.
- Use `useEnvironmentContext()` / `useLocaleContext()` in descendants instead of re-deriving these values manually.
