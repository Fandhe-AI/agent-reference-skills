---
source: https://vite.dev/guide/features#dynamic-import
---

# Dynamic Import

Vite supports dynamic import with variables, similar to glob import.

## Signature / Usage

```ts
const module = await import(`./dir/${file}.js`)
```

## Notes

- Variables only represent file names one level deep. If `file` is `'foo/bar'`, the import fails. For more advanced usage use glob import.
- To be bundled, the dynamic import must match these rules:
  - Imports must start with `./` or `../` or `#`: ``import(`./dir/${foo}.js`)`` is valid, ``import(`${foo}.js`)`` is not.
  - Imports must end with a file extension: ``import(`./dir/${foo}.js`)`` is valid, ``import(`./dir/${foo}`)`` is not.
  - Imports to the own directory must specify a file name pattern: ``import(`./prefix-${foo}.js`)`` is valid, ``import(`./${foo}.js`)`` is not.
- The rules prevent accidentally importing unintended files; without them `import(foo)` would bundle everything in the file system.

## Related

- [import.meta.glob](./glob-import.md)
