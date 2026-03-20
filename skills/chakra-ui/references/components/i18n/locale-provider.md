# LocaleProvider

Sets the locale for the app, affecting formatting of dates, numbers, and other locale-specific data across supported Chakra UI components.

## Import

```tsx
import { LocaleProvider, useLocaleContext } from "@chakra-ui/react"
```

## Usage

```tsx
<LocaleProvider locale="ar-AE">
  <Stack gap="4" maxW="sm" dir="rtl">
    <Heading>مرحباً بكم في تشاكرا يو آي</Heading>
    <Text>هذا مثال على كيفية استخدام موفر اللغة في تطبيقك.</Text>
  </Stack>
</LocaleProvider>
```

## Props

### LocaleProvider

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `string` | `"en-US"` | The locale to use for the application |

## Notes

- Use `useLocaleContext()` to access the current locale from any child component
- Affects `FormatNumber`, `FormatByte`, and other i18n components automatically
- Wrap at the app root to apply globally, or wrap a subtree to scope locale changes

## Related

- [FormatNumber](./format-number.md)
- [FormatByte](./format-byte.md)
