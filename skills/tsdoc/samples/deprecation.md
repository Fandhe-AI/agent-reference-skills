# Deprecation Comment

Mark an API as deprecated with a migration note using @deprecated and @see.

```typescript
/**
 * Formats a date string in locale-specific format.
 *
 * @param date - The date to format
 * @returns Locale-formatted date string
 *
 * @deprecated Use {@link formatDate} from `date-utils` instead.
 * This function will be removed in v3.0.
 *
 * @see {@link formatDate}
 */
export function legacyFormatDate(date: Date): string {
  return date.toLocaleDateString();
}

/**
 * Formats a date using Intl.DateTimeFormat.
 *
 * @param date - The date to format
 * @param locale - BCP 47 locale string (default: `"en-US"`)
 * @returns Locale-formatted date string
 */
export function formatDate(date: Date, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale).format(date);
}
```

## Notes

- `@deprecated` accepts a free-text message; always include a migration path or replacement API
- Use the inline tag `{@link Target}` (with curly braces) to link to the replacement symbol
- `@see` lists related symbols or URLs for additional context
- Documentation tools (TypeDoc, VS Code) surface `@deprecated` as a strikethrough warning in IntelliSense
