# @overload

Modifier tag for declaring function overloads in JavaScript projects. Recognized from TypeScript 5.0 onward.

## Signature / Usage

```
/**
 * @overload
 * @param {Type} paramName Description
 * @return {ReturnType}
 */
```

The `@overload` tag is used in JavaScript projects to define multiple signatures (overloads) for a function. It corresponds to the JSDoc overload support introduced in TypeScript 5.0.

The tag itself is automatically stripped from the generated documentation; only the `@param` and `@return` information from each overload is shown as the function's signature.

```javascript
/**
 * @overload
 * @param {string} value A string value
 * @return {void}
 */
/**
 * @overload
 * @param {number} value A numeric value
 * @param {number} [maximumFractionDigits] Maximum number of fraction digits
 * @return {void}
 */
/**
 * @param {string | number} value
 * @param {number} [maximumFractionDigits]
 */
function printValue(value, maximumFractionDigits) {
    if (typeof value === "number") {
        console.log(value.toFixed(maximumFractionDigits));
    } else {
        console.log(value);
    }
}
```

In the example above, two overload signatures are defined for `printValue`:
1. `printValue(value: string): void`
2. `printValue(value: number, maximumFractionDigits?: number): void`

## Notes

- Intended for JavaScript projects (TypeScript projects should use native overload syntax)
- Recognized from TypeScript 5.0 onward
- Automatically removed from the generated documentation
- Can be excluded via the `--excludeTags` option

## Related

- [@param](../tags-block/param.md)
- [@returns](../tags-block/returns.md)
