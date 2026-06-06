# Custom Hook Comment

Document a React custom hook with @param, @returns, and @example tags.

```typescript
/**
 * Manages a debounced search query string.
 *
 * @param initialQuery - Initial value of the search input
 * @param delay - Debounce delay in milliseconds
 * @returns Object containing the raw query, debounced query, and setter function
 *
 * @example
 * ```tsx
 * const { query, debouncedQuery, setQuery } = useSearchInput("", 300);
 *
 * return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
 * ```
 *
 * @category Hooks
 */
export const useSearchInput = (initialQuery: string, delay: number) => {
  // implementation
};
```

## Notes

- Describe each parameter individually with `@param name - description`; omit the TypeScript type
- `@returns` should describe the shape of the returned value, not just say "the return value"
- Use `@category Hooks` so hook references are grouped separately from components in generated docs
- If the hook can throw, add `@throws` with the error type and condition
