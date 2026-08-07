# @abstract

Modifier tag that marks a method or property as abstract in the generated documentation, regardless of its actual TypeScript implementation state.

## Signature / Usage

```
/** @abstract */
```

Applying `@abstract` to a class method or property displays it as an abstract member in the generated documentation. Unlike TypeScript's `abstract` keyword, it can be used on methods that actually have a default implementation.

The primary use case is modules consumed by JavaScript users (without type information): a subclass method that should be overridden can ship with a default implementation while still being documented as abstract. The default implementation can improve the developer experience by throwing a more helpful error message.

```typescript
export class AbstractExample {
    /**
     * Must be overridden in a subclass.
     * @abstract
     */
    requiredOverride(): void {
        throw new Error(
            "requiredOverride not implemented in subclass of AbstractExample",
        );
    }
}
```

In the example above, `requiredOverride` has a default implementation but is documented as an abstract method.

## Notes

- Unlike TypeScript's `abstract` keyword, this tag has no compile-time enforcement
- Mainly useful for JavaScript projects, or for consumers without type information
- The `--visibilityFilters` option controls whether it is shown in the generated output

## Related

- [@public](./public.md)
- [@virtual](./virtual.md)
- [@override](./override.md)
