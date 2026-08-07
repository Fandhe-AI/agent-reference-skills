# reset

Clears all documents from an index.

## Signature / Usage

```ts
const responseReset = await index.reset()
// 'Success'
```

## Notes

- Returns `'Success'` on completion
- Removes all documents in the index but does not delete the index itself

## Related

- [info.md](./info.md)
- [delete.md](./delete.md)
