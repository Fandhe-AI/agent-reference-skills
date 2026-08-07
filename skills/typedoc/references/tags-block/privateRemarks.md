# @privateRemarks

Block tag for adding documentation text that should not be included in the generated API reference documentation.

## Signature / Usage

```
@privateRemarks
Internal notes or comments
```

The `@privateRemarks` tag can be used to include implementation notes or internal comments that are not intended for API consumers. Text inside this tag is excluded from the generated documentation output by default.

Conforms to the TSDoc specification.

If the `--excludeTags` option has been customized, this tag must be added to the list manually to keep it excluded.

```typescript
/**
 * Some docs here
 *
 * @privateRemarks
 * Implementation detail notes not useful to the API consumer
 */
export function rand(): number;
```

## Notes

- Excluded from generated documentation by default
- If `--excludeTags` has been customized, this tag must be added to the list manually
- Suitable for recording implementation details and internal notes

## Related

- [@remarks](./remarks.md) -- publicly visible detailed description
- `--excludeTags` option -- tag exclusion configuration
- [TSDoc @privateRemarks](https://tsdoc.org/pages/tags/privateRemarks/)
