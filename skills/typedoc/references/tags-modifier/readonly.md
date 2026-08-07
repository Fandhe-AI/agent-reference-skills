# @readonly

Modifier tag that documents a reflection as read-only regardless of its actual TypeScript writability.

## Signature / Usage

```
/** @readonly */
```

The `@readonly` tag instructs TypeDoc to document a reflection as read-only, regardless of the actual writability rules enforced by TypeScript.

When applied, the setter method associated with a property is removed from the generated documentation. This presents the property as read-only in the documentation even though a setter exists in the code.

```typescript
export class Config {
    private _name: string = "";

    /**
     * Configuration name. Exposed as read-only.
     * @readonly
     */
    get name(): string {
        return this._name;
    }

    // This setter is not included in the documentation
    set name(value: string) {
        this._name = value;
    }
}
```

```typescript
export class Counter {
    private _count = 0;

    /**
     * Current count value.
     * @readonly
     */
    get count(): number {
        return this._count;
    }

    set count(value: number) {
        if (value >= 0) {
            this._count = value;
        }
    }

    increment(): void {
        this._count++;
    }
}
```

## Notes

- Removes the setter method from the documentation
- Operates independently of TypeScript's `readonly` keyword
- Useful when you want to hide the setter of a getter/setter pair in the documentation
- Follows the TSDoc spec: https://tsdoc.org/pages/tags/readonly/

## Related

- [@sealed](./sealed.md)
- [@virtual](./virtual.md)
