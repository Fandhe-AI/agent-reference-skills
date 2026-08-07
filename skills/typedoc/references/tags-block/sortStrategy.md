# @sortStrategy

Block tag for overriding the global sort configuration at the declaration level.

## Signature / Usage

```
@sortStrategy strategyName
```

The `@sortStrategy` tag can be used to locally override the `sort` option for a module, namespace, class, or interface.

The sort applies to the direct children of the declaration on which the tag is placed. If a child itself has further children (e.g. a nested namespace), the grandchildren are not sorted according to the `@sortStrategy` tag.

```typescript
/**
 * @sortStrategy source-order
 */
export class Class {
    commonMethod(): void;
    commonMethod2(): void;
    lessCommonMethod(): void;
    uncommonMethod(): void;
}
```

In the example above, the methods are displayed in source-code order rather than being sorted alphabetically.

## Notes

- Applies only to direct children (not to grandchildren)
- Can be used on modules, namespaces, classes, and interfaces
- Strategy names are the same values accepted by the `--sort` option (e.g. `source-order`, `alphabetical`)

## Related

- `--sort` option -- global sort configuration
