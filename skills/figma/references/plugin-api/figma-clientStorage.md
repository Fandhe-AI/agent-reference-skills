# figma.clientStorage

Sub-API for persisting data locally on the user's machine. Data is scoped to the plugin ID and is not synced across users or devices.

## Signature / Usage

```ts
// Store a value
await figma.clientStorage.setAsync('theme', 'dark');

// Retrieve a value
const theme = await figma.clientStorage.getAsync('theme');

// Delete a key
await figma.clientStorage.deleteAsync('theme');

// List all keys
const keys = await figma.clientStorage.keysAsync();
```

## Options / Props

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `getAsync()` | `(key: string) => Promise<any \| undefined>` | Retrieve value by key; returns `undefined` if not found |
| `setAsync()` | `(key: string, value: any) => Promise<void>` | Store a value; rejects on failure |
| `deleteAsync()` | `(key: string) => Promise<void>` | Remove a key; no-op if key doesn't exist |
| `keysAsync()` | `() => Promise<string[]>` | List all stored keys |

## Notes

- Storage capacity: **5 MB per plugin**.
- Supported value types: objects, arrays, strings, numbers, booleans, `null`, `undefined`, `Uint8Array`.
- Data is isolated by plugin ID — different plugins cannot access each other's storage.
- Data is **not synchronized** across users or machines.

## Related

- [figma global object](./figma-global.md)
