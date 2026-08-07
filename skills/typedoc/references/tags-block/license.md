# @license

Block tag that marks a comment as a license declaration and excludes it from the generated documentation.

## Signature / Usage

```
@license License Identifier
```

Comments containing `@license` are excluded from the generated documentation. When TypeDoc detects this tag, it treats the entire comment block as a license notice rather than documentation content.

This lets you include license information in source code without it appearing in the final API documentation.

```typescript
/** @license Apache-2.0 */
export const api = {
    // The comment for this export is not documented
};
```

## Notes

- The entire comment block containing `@license` is excluded from documentation generation
- Suitable for declaring SPDX license identifiers or license text
- Can be used for module/export-level license declarations
- If a comment block contains `@license`, other documentation within that block is also excluded

## Related

- [@import](./import.md) -- another tag whose comment is likewise ignored by TypeDoc
