# @ignore

Modifier tag that completely removes a reflection from the generated documentation. Equivalent to `@hidden`.

## Signature / Usage

```
/** @ignore */
```

A reflection tagged `@ignore` is completely removed from the generated documentation. It is functionally equivalent to the `@hidden` tag, and TypeDoc recognizes both.

It is supported for compatibility with JSDoc. Unlike `@internal`, `@ignore` always removes the item from the documentation regardless of any option settings.

```typescript
export class Visibility {
    /** @ignore */
    newBehavior(): void;
}
```

```typescript
export class Logger {
    /**
     * Internal method for debugging.
     * @ignore
     */
    _debugInternal(msg: string): void {
        console.debug(`[DEBUG] ${msg}`);
    }

    /**
     * Logs a message.
     */
    log(msg: string): void {
        this._debugInternal(msg);
    }
}
```

## Notes

- Functionally equivalent to `@hidden`
- Unlike `@internal`, it is always removed from the documentation (no option required)
- Supported for compatibility with JSDoc

## Related

- [@hidden](./hidden.md)
- [@internal](./internal.md)
- [@hideconstructor](./hideconstructor.md)
