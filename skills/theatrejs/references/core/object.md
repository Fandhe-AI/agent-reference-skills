# Object (Sheet Object)

An animatable or tweak-able entity on a Sheet with typed props. Created via `sheet.object()`.

## Signature / Usage

```ts
const obj = sheet.object(
  key: string,
  config: Props,
  options?: { reconfigure?: boolean }
): ISheetObject

// Read current values
console.log(obj.value.position.x)

// Subscribe to all prop changes
const unsubscribe = obj.onValuesChange((values) => {
  mesh.position.x = values.position.x
})

// Unsubscribe when done
unsubscribe()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `key` | `string` | Unique key for this object within the sheet |
| `config` | `Props` | Plain object or typed props using `types.*` |
| `options.reconfigure` | `boolean` | If `true`, updates the prop config of an existing object |

### Object properties

| Name | Type | Description |
| --- | --- | --- |
| `obj.value` | `Values` | Current snapshot of all prop values |
| `obj.props` | `Pointer<Props>` | Reactive pointer to the object's props (for use with `val` / `onChange`) |
| `obj.initialValue` | `Values` | Override default prop values without creating keyframes |
| `obj.sheet` | `Sheet` | Parent sheet reference |
| `obj.project` | `Project` | Parent project reference |
| `obj.address` | `{ projectId, sheetId, sheetInstanceId, objectKey }` | Unique identifier |
| `obj.onValuesChange(cb)` | `(callback) => unsubscribe` | Subscribes to all prop value changes |

## Notes

- `sheet.object()` is idempotent: calling it with the same `key` returns the existing object unless `reconfigure: true` is passed
- Use `obj.onValuesChange` to drive DOM/Three.js updates on every frame
- `obj.initialValue` sets values that are used when no keyframe exists, without recording animation data
- Call `sheet.detachObject(key)` to remove the object; unsubscribe listeners first to avoid memory leaks

## Related

- [Sheet](./sheet.md)
- [types](./types.md)
- [val](./val.md)
- [onChange](./on-change.md)
