# @document

Block tag that instructs TypeDoc to include an external file as a document within the generated site.

## Signature / Usage

```
@document File Path
```

The `@document` tag instructs TypeDoc to include the file at the path specified in the tag content as a document within the generated site. This lets you integrate external markdown files, for example, into the API documentation.

```typescript
/**
 * @document promise-tutorial.md
 */
export class Promise<T> {
    // ...
}
```

## Notes

- The specified path can be relative or absolute
- See the "External Documents" guide for detailed usage
- Related to the `projectDocuments` option and its configuration

## Related

- `projectDocuments` option -- managing documents within a project
