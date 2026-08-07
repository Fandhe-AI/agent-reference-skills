# @defaultValue

Block tag that records the default value of an accessor or property.

## Signature / Usage

```
@defaultValue Description of the default value
```

or

```
@default Description of the default value
```

The `@defaultValue` tag can be used to document the default value of an accessor or property. TypeDoc recognizes `@default` as a commonly used alternative form.

The default theme assigns no special behavior to this tag and, like other block tags, displays its content under a `# Default Value` heading.

It conforms to the TSDoc specification.

```typescript
export interface CompilerOptions {
    strict?: boolean;

    /**
     * @defaultValue `true` if `strict` is `true`, otherwise `false`
     */
    strictNullChecks?: boolean;
}
```

## Notes

- `@defaultValue` and `@default` behave identically
- The default theme renders it as a paragraph under a `# Default Value` heading
- Suitable for documenting accessors and properties

## Related

- [@property](./property.md) -- documenting properties
- [TSDoc @defaultValue](https://tsdoc.org/pages/tags/defaultValue/)
