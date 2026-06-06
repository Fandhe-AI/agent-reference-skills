# Function Comment

Document a utility function with @param, @returns, and @example tags.

```typescript
/**
 * Adds two numbers together.
 *
 * @param x - The first operand
 * @param y - The second operand
 * @returns The sum of x and y
 *
 * @example
 * ```ts
 * console.log(add(1, 1));  // 2
 * console.log(add(1, -1)); // 0
 * ```
 */
export function add(x: number, y: number): number {
  return x + y;
}
```

## Notes

- `@param` uses a hyphen separator: `@param name - description`
- Do not include type annotations in `@param`; TypeScript infers them automatically
- `@returns` (not `@return`) is the correct TSDoc spelling
- Wrap code inside `@example` with a fenced code block using the appropriate language identifier
