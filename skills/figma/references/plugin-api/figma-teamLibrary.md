# figma.teamLibrary

Sub-API for accessing published library variables and collections. Requires `"teamlibrary"` in the `permissions` array of `manifest.json`.

## Signature / Usage

```ts
// List all available library variable collections
const collections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();

// Get variables inside a collection
for (const coll of collections) {
  const vars = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(coll.key);
  // Import a specific variable
  const imported = await figma.variables.importVariableByKeyAsync(vars[0].key);
}
```

## Options / Props

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `getAvailableLibraryVariableCollectionsAsync()` | `() => Promise<LibraryVariableCollection[]>` | All variable collections from enabled libraries in the current file |
| `getVariablesInLibraryCollectionAsync()` | `(libraryCollectionKey: string) => Promise<LibraryVariable[]>` | All variables inside a specific library collection |

## Notes

- `manifest.json` must include `"permissions": ["teamlibrary"]`.
- Libraries must be manually enabled by the user via Figma's UI; the Plugin API cannot enable them programmatically.
- `LibraryVariableCollection` and `LibraryVariable` are descriptors only — to use a variable in the document, import it first via `figma.variables.importVariableByKeyAsync(key)`.
- Promises reject if the collection doesn't exist, the user lacks access, or the request fails.

## Related

- [figma.variables](./figma-variables.md)
- [manifest](./manifest.md)
