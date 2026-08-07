# @example

Block tag used to show a usage example for a function or feature.

## Signature / Usage

```
@example
Example code or text
```

The `@example` tag indicates that the following text is an example of how to use the function. It conforms to the TSDoc specification.

TypeDoc processes the content of `@example` in two ways:

1. **Without a code block**: If no markdown code block is included, TypeDoc treats the entire tag content as a code example. This approach is not strictly TSDoc-compliant but is supported for compatibility with VSCode.

2. **With a code block**: If a code block marked with triple backticks is included, both TypeDoc and VSCode treat text outside the code block as regular documentation text, and only the marked section as code.

### Without a code block

```typescript
/**
 * @example
 * factorial(3) // => 6
 */
export function factorial(n: number): number;
```

### With a code block

````typescript
/**
 * @example
 * Here's a simple example:
 * ```typescript
 * factorial(3) // => 6
 * ```
 */
export function factorial(n: number): number;
````

## Notes

- Without a code block, the entire tag content is treated as code
- With a code block, only the explicitly marked section is displayed as code
- Multiple `@example` tags can be included in a single comment
- The TSDoc specification recommends the code-block format

## Related

- [TSDoc @example](https://tsdoc.org/pages/tags/example/)
