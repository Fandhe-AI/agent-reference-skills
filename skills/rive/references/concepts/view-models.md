# ViewModels

Reusable data blueprints that define the structure of data used in a Rive scene. A ViewModel defines which properties exist and their types; ViewModel Instances hold the actual values.

## Signature / Usage

ViewModels are created in the Data panel. At runtime, instances are obtained from the Rive instance.

```typescript
// Retrieve a ViewModel and create an instance
const viewModel = riveInstance.viewModel("Car");

const vmiBlank   = viewModel.instance();              // blank instance (default values)
const vmiDefault = viewModel.defaultInstance();       // instance marked as default in editor
const vmiNamed   = viewModel.instanceByName("Race1"); // named instance
```

## Options / Props

### ViewModel Properties

| Type | Description |
| --- | --- |
| Number | Numeric value (float) |
| String | Text value |
| Boolean | True / false flag |
| Color | RGBA color value |
| Enum | Fixed-set selection from a custom or system enum |
| List | Collection of ViewModel instances, used for repeating content |

### Connection Patterns

| Pattern | Description |
| --- | --- |
| Global Instances | Global view models and their properties are directly accessible to all artboards (not connected to a specific artboard) |
| Instances attached to Artboards | The instance is attached to a specific artboard or nested component; its values are usable by that artboard and its children (e.g. an `EnemyVM` with `health`) |
| Instances as nested properties (Nested Component Instance) | Parent ViewModel stores references to child instances, directly or through a list; useful for collections (e.g. `GameVM.inventory` storing an `InventoryVM` instance) |
| Stateful Components | Self-contained components that manage their own data without requiring a parent reference; properties are exposed in the sidebar |

### Instance management

- Removing: click the `-` icon next to the instance name. This removes only that instance and its stored values, not the View Model or its properties.
- Exporting: exported instances are included in the `.riv` by default. Disable **Export Instance** for development-only data (e.g. fake high scores) to keep file size small.

## Notes

- A ViewModel itself stores no values — it is a schema. Instances store values.
- When a ViewModel is created, Rive automatically generates one instance named "Instance" for immediate editor testing.
- Multiple instances can share the same ViewModel structure while holding independent data.
- By default, instances are exported inside `.riv` files. Disable export for development-only instances to keep file sizes small.
- The source page is now titled "View Models & Instances".
- Bindings to Global View Model properties are always relative bindings: the binding searches for a same-named property starting from the closest View Model, so a closer View Model's property with the same name (e.g. `scale`) wins over the global one.
- ViewModels support nested composition: a ViewModel property can reference another ViewModel, enabling parent–child data hierarchies.

## Related

- [Data Binding](./data-binding.md)
- [Instances](./instances.md)
- [Properties](./properties.md)
