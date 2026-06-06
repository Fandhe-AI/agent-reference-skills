# Multiple Examples

Provide several named @example sections to cover distinct use cases.

```typescript
/**
 * Parses a JSON file from disk and returns the typed result.
 *
 * @param filePath - Absolute path to the JSON file
 * @returns Parsed object, or `null` if the file is empty
 * @throws {@link ParseError} if the file content is not valid JSON
 *
 * @example Basic usage
 * ```ts
 * const config = parseJsonFile("/project/config.json");
 * ```
 *
 * @example With type parameter
 * ```ts
 * interface Config { debug: boolean; port: number; }
 * const config = parseJsonFile<Config>("/project/config.json");
 * console.log(config?.port); // 3000
 * ```
 *
 * @example Handling a missing file
 * ```ts
 * try {
 *   parseJsonFile("/nonexistent.json");
 * } catch (e) {
 *   console.error(e.message);
 * }
 * ```
 */
export function parseJsonFile<T = unknown>(filePath: string): T | null {
  // implementation
  return null;
}
```

## Notes

- Text on the same line as `@example` becomes the section title; without a title, tools number examples sequentially
- Each `@example` block is independent; start a fresh fenced code block for every example
- Prefer named examples when an API has meaningfully different invocation patterns
- Code fence language identifiers (`ts`, `tsx`, `json`) control syntax highlighting in generated docs
