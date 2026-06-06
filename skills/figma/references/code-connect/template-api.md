# Template API

Core TypeScript/JavaScript API for building Code Connect template files. Provides the `figma` object, `InstanceHandle` methods, and type definitions.

## Signature / Usage

```javascript
import figma from 'figma'

const disabled = instance.getBoolean('Disabled')
const iconSnippet = instance.findInstance('Icon').executeTemplate().example

export default {
  example: figma.code`<Button disabled={${disabled}}>${iconSnippet}</Button>`,
  id: 'button-template',
  metadata: { nestable: true },
}
```

## Options / Props

### `figma` object

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `figma.selectedInstance` | `InstanceHandle` | Currently selected layer |
| `figma.code` | Tagged template literal | Builds `ResultSection[]` for the snippet; use instead of string concatenation |
| `figma.batch` | `object` | Available in batch files; provides `url`, `source`, `component`, and custom JSON fields |
| `figma.helpers` | `object` | Utility helpers for framework-specific rendering |

### `InstanceHandle` — property access

| Method | Signature | Description |
|--------|-----------|-------------|
| `getBoolean` | `(propName: string, options?: Record<string, any>): boolean \| any` | Retrieve a boolean property; optional map for custom values |
| `getString` | `(propName: string): string` | Retrieve a string property |
| `getEnum` | `(propName: string, options: Record<string, any>): any` | Map a variant property to a code value |
| `getPropertyValue` | `(propName: string): string \| boolean` | Retrieve raw property value |
| `getInstanceSwap` | `(propName: string): InstanceHandle` | Retrieve an instance-swap property |
| `getSlot` | `(propName: string): ResultSection[] \| undefined` | Reference a flexible content slot |
| `hasCodeConnect` | `(): boolean` | Whether the instance has a Code Connect document |
| `codeConnectId` | `(): string \| null` | Code Connect ID of the instance |

### `InstanceHandle` — layer finding

| Method | Signature | Description |
|--------|-----------|-------------|
| `findText` | `(layerName: string, opts?: SelectorOptions): TextHandle \| ErrorHandle` | Find a text layer by name |
| `findInstance` | `(layerName: string, opts?: SelectorOptions): InstanceHandle \| ErrorHandle` | Find a nested instance by layer name |
| `findConnectedInstance` | `(codeConnectId: string, opts?: SelectorOptions): InstanceHandle \| ErrorHandle` | Find an instance by Code Connect ID |
| `findConnectedInstances` | `(selectorFn: (node: InstanceHandle) => boolean, opts?: SelectorOptions): InstanceHandle[]` | Find all child instances matching a selector |
| `findLayers` | `(selectorFn: (node) => boolean, opts?: SelectorOptions): (InstanceHandle \| TextHandle \| ErrorHandle)[]` | Find any layers matching a selector |

### `InstanceHandle` — execution

| Method | Returns | Description |
|--------|---------|-------------|
| `executeTemplate` | `{ example: ResultSection[], metadata: Metadata }` | Run the nested instance's template and return its snippet |

### `TextHandle`

| Property | Type | Description |
|----------|------|-------------|
| `textContent` | `string` | The text layer's string content |

### `SelectorOptions`

| Field | Type | Description |
|-------|------|-------------|
| `path` | `string[]` | Parent layer name hierarchy to restrict the search |
| `traverseInstances` | `boolean` | Whether to search through nested instances |

### `figma.helpers.react` — value type wrappers

| Helper | Description |
|--------|-------------|
| `jsxElement(value)` | Wrap a JSX element string |
| `function(value)` | Wrap a function expression string |
| `identifier(value)` | Wrap an identifier string |
| `object(value)` | Wrap a plain object |
| `templateString(value)` | Wrap a template string |
| `reactComponent(value)` | Wrap a React component reference |
| `array(value)` | Wrap an array |
| `renderProp(name, prop)` | Render a prop as a JSX attribute string |
| `renderChildren(prop)` | Render prop as JSX children |
| `renderPropValue(prop)` | Render a prop value |
| `stringifyObject(obj)` | Stringify an object for use in JSX |
| `isReactComponentArray(prop)` | Check if value is an array of React components |

### `figma.helpers.swift` / `figma.helpers.kotlin`

Both provide `renderChildren(children: any, prefix: string): ResultSection[]` for properly indented nested rendering.

### `ResultSection` union types

| Type | Fields | Description |
|------|--------|-------------|
| `CodeSection` | `type: 'CODE'`, `code: string` | A literal code string |
| `InstanceSection` | `type: 'INSTANCE'`, `guid: string`, `symbolId: string` | A linked component instance |
| `SlotSection` | `type: 'SLOT'`, `guid: string` | A slot reference |
| `ErrorSection` | `type: 'ERROR'`, `message: string`, `errorObject?: ResultError` | An error placeholder |

## Notes

- Always use `figma.code` tagged template literal instead of plain string concatenation to preserve pill rendering in Dev Mode
- `figma.batch` is only available inside `.figma.batch.ts` template files

## Related

- [Template Files](./template-files.md)
- [Batch Files](./batch-files.md)
- [React Integration](./react.md)
