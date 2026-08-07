# @alpha

Modifier tag marking a member intended for eventual use by third-party developers, but not yet stable enough to follow semantic versioning.

## Signature / Usage

```
/** @alpha */
```

`@alpha` indicates an API's maturity level. A member tagged `@alpha` is at the earliest release phase and may change with frequent breaking changes.

It conforms to the TSDoc specification, and TypeDoc can show/hide `@alpha`-tagged members via the `--visibilityFilters` option.

The release stability hierarchy is:
1. `@alpha` — least stable, subject to major changes
2. `@beta` / `@experimental` — reasonably stable but not SemVer-compliant
3. `@public` — stable

```typescript
export class Visibility {
    /** @alpha */
    newBehavior(): void;
}
```

```typescript
export class ApiClient {
    /**
     * New authentication flow. Subject to significant change.
     * @alpha
     */
    authenticateV2(token: string): Promise<void> {
        // ...
    }
}
```

## Notes

- Conforms to the TSDoc specification: https://tsdoc.org/pages/tags/alpha/
- The `--visibilityFilters` option controls visibility of `@alpha` members
- Do not use `@alpha` together with `@beta` / `@experimental`

## Related

- [@beta](./beta.md)
- [@experimental](./experimental.md)
- [@public](./public.md)
- [@internal](./internal.md)
