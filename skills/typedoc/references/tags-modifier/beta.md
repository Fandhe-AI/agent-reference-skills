# @beta

Modifier tag marking a member intended for eventual use by third-party developers, but not yet stable enough to follow semantic versioning.

## Signature / Usage

```
/** @beta */
```

`@beta` is used for members whose API maturity is further along than `@alpha` but not yet considered stable. Per the TSDoc specification, `@beta` and `@experimental` are treated as semantically equivalent.

Within a project, it is recommended to use only one of the two consistently rather than mixing them.

TypeDoc can show/hide `@beta`-tagged members via the `--visibilityFilters` option.

```typescript
export class Visibility {
    /** @beta */
    newBehavior(): void;
}
```

```typescript
export class SearchEngine {
    /**
     * Fuzzy search feature. The API may change.
     * @beta
     */
    fuzzySearch(query: string, options?: FuzzyOptions): Result[] {
        // ...
    }
}
```

## Notes

- Conforms to the TSDoc specification: https://tsdoc.org/pages/tags/beta/
- `@beta` and `@experimental` are semantically equivalent; use only one consistently
- The `--visibilityFilters` option controls visibility

## Related

- [@alpha](./alpha.md)
- [@experimental](./experimental.md)
- [@public](./public.md)
- [@internal](./internal.md)
