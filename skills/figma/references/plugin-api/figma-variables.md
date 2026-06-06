# figma.variables

Sub-API for creating and managing Variables and VariableCollections — Figma's design token system.

## Signature / Usage

```ts
// Create a collection and a color variable
const collection = figma.variables.createVariableCollection('Brand');
const colorVar   = figma.variables.createVariable('primary', collection, 'COLOR');

// Set value for a mode
colorVar.setValueForMode(collection.defaultModeId, { r: 0, g: 0.47, b: 1, a: 1 });

// Bind to a node fill
const paint = figma.util.solidPaint('#0078FF');
const bound = figma.variables.setBoundVariableForPaint(paint, 'color', colorVar);
node.fills = [bound];

// Import from library
const imported = await figma.variables.importVariableByKeyAsync(key);
```

## Options / Props

### Retrieval Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `getVariableByIdAsync()` | `(id: string) => Promise<Variable \| null>` | Find variable by ID |
| `getVariableCollectionByIdAsync()` | `(id: string) => Promise<VariableCollection \| null>` | Find collection by ID |
| `getLocalVariablesAsync()` | `(type?: VariableResolvedDataType) => Promise<Variable[]>` | All local variables, optionally filtered by type |
| `getLocalVariableCollectionsAsync()` | `() => Promise<VariableCollection[]>` | All local collections |

### Creation Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `createVariable()` | `(name, collection, resolvedType) => Variable` | Create a new variable inside a collection |
| `createVariableCollection()` | `(name: string) => VariableCollection` | Create a new collection |
| `extendLibraryCollectionByKeyAsync()` | `(collectionKey, name) => Promise<ExtendedVariableCollection>` | Extend a library collection locally |

### Alias / Binding Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `createVariableAlias()` | `(variable) => VariableAlias` | Create an alias referencing another variable |
| `createVariableAliasByIdAsync()` | `(variableId) => Promise<VariableAlias>` | Async version using variable ID |
| `setBoundVariableForPaint()` | `(paint, field, variable \| null) => SolidPaint` | Bind variable to a `SolidPaint` field |
| `setBoundVariableForEffect()` | `(effect, field, variable \| null) => Effect` | Bind variable to an effect property |
| `setBoundVariableForLayoutGrid()` | `(grid, field, variable \| null) => LayoutGrid` | Bind variable to a layout grid property |

### Library

| Name | Signature | Description |
|------|-----------|-------------|
| `importVariableByKeyAsync()` | `(key: string) => Promise<Variable>` | Load a published variable from team library |

## Notes

- Synchronous variants (`getVariableById`, `getLocalVariables`, etc.) are **deprecated**; they throw when `documentAccess: "dynamic-page"` is set.
- Passing `null` as the `variable` argument to binding helpers **unbinds** the field.
- `VariableResolvedDataType` values: `'BOOLEAN'`, `'COLOR'`, `'FLOAT'`, `'STRING'`.

## Related

- [figma.teamLibrary](./figma-teamLibrary.md)
- [data-types: Variable](./data-types.md)
- [node-properties: boundVariables](./node-properties.md)
