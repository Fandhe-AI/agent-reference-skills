# @public

Modifier tag that overrides a reflection's visibility to public. Its use is generally discouraged.

## Signature / Usage

```
/** @public */
```

The `@public` tag overrides a reflection's visibility to public. For example, applying `@public` to a member declared as `protected` makes it appear as public in the documentation.

Use of this tag is generally discouraged. TypeDoc recommends treating every exported member that is not explicitly annotated with `@alpha`, `@beta`, `@experimental`, or `@internal` as public.

### Difference from the TSDoc spec

TypeDoc's implementation differs from the TSDoc standard. TSDoc distinguishes member visibility from release visibility separately, whereas TypeDoc changes the effective visibility for backward compatibility. The `@public` badge is shown only on directly annotated members and is not inherited by contained members.

```typescript
export class Visibility {
    /** @public */
    protected member = 123;
}

// `member` is displayed as public in the documentation
```

```typescript
export class EventBus {
    /**
     * Fires an event. Intended for subclasses, but exposed in the docs.
     * @public
     */
    protected emit(event: string, data: unknown): void {
        // ...
    }
}
```

## Notes

- Generally discouraged
- Implementation differs from the TSDoc spec (member visibility vs. release visibility)
- The `@public` badge is shown only on directly annotated members
- Exported members without `@alpha` / `@beta` / `@experimental` / `@internal` are implicitly public

## Related

- [@private](./private.md)
- [@protected](./protected.md)
- [@internal](./internal.md)
- [@alpha](./alpha.md)
- [@beta](./beta.md)
- [@experimental](./experimental.md)
