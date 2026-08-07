# @hideconstructor

Modifier tag that hides a class's constructor from the generated documentation. Provided as a workaround for TypeScript issue #58653.

## Signature / Usage

```
/** @hideconstructor */
```

`@hideconstructor` removes a class's constructor from the documentation. There are two ways to use it:

1. **On the class declaration**: the class's constructor is excluded from the documentation
2. **On the constructor itself**: that constructor is removed from the documentation

This tag exists as a workaround for TypeScript issue #58653; using `@hidden` or `@ignore` is recommended where possible.

### Applied to the class declaration

```typescript
/** @hideconstructor */
export class Visibility {
    /** Not included in the documentation */
    constructor() {}
}
```

### Applied directly to the constructor

```typescript
export class Service {
    /**
     * @hideconstructor
     */
    constructor(private config: Config) {}

    static create(config: Config): Service {
        return new Service(config);
    }
}
```

## Notes

- Exists as a workaround for TypeScript#58653
- Using `@hidden` or `@ignore` is recommended where possible
- May become unnecessary in a future TypeScript version

## Related

- [@hidden](./hidden.md)
- [@ignore](./ignore.md)
