# Locale

The `LocaleProvider` establishes locale settings for the application, controlling the formatting of dates, numbers, and other locale-specific data. Without a provider, the app defaults to `en-US` locale with `ltr` direction.

## Signature / Usage

```tsx
import { LocaleProvider } from '@ark-ui/react/locale'

export const App = () => {
  return <LocaleProvider locale="de-DE">{/* Your App */}</LocaleProvider>
}
```

Accessing context values:

```tsx
import { useLocaleContext } from '@ark-ui/react/locale'

export const Usage = () => {
  const { locale, dir } = useLocaleContext()
  return <pre>{JSON.stringify({ locale, dir }, null, 2)}</pre>
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `locale` | `string` | `'en-US'` | Locale applied across the application |

## Notes

- Without explicit configuration, applications default to `en-US` with left-to-right text direction
- `useLocaleContext` exposes `locale` and `dir`

## Related

- [Format Number](./format-number.md)
- [Format Time](./format-time.md)
- [Format Relative Time](./format-relative-time.md)
