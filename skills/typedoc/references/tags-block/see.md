# @see

Block tag for creating a list of references to related resources.

## Signature / Usage

```
@see [display text](URL)
```

```
@see {@link symbolName}
```

The `@see` tag is used to create a list of references to other resources related to an export.

Conforms to the TSDoc specification.

**Important difference from JSDoc**: TypeDoc handles `@see` differently from JSDoc. JSDoc can parse the tag content as a bare symbol reference, but TypeDoc requires the explicit `{@link}` syntax to reference another symbol. A bare symbol name without the `{@link}` wrapper is not supported.

```typescript
/**
 * @see [Factorial - Wikipedia](https://en.wikipedia.org/wiki/Factorial)
 * @see {@link semifactorial}
 */
export function factorial(n: number): number;
```

## Notes

- The `{@link}` syntax must always be used when referencing another symbol
- URL links should be written in Markdown format `[text](URL)`
- JSDoc's bare symbol reference syntax does not work in TypeDoc
- Multiple `@see` tags can be included in a single comment

## Related

- [TSDoc @see](https://tsdoc.org/pages/tags/see/)
- [JSDoc @see](https://jsdoc.app/tags-see)
