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
| Top-Level Instance | Data lives on the main artboard; accessible throughout the file and all nested components |
| Nested Component Instance | Parent ViewModel references child instances; useful for collections |
| Stateful Components | Self-contained components that manage their own data without requiring a parent reference |

## Notes

- A ViewModel itself stores no values — it is a schema. Instances store values.
- When a ViewModel is created, Rive automatically generates one instance named "Instance" for immediate editor testing.
- Multiple instances can share the same ViewModel structure while holding independent data.
- By default, instances are exported inside `.riv` files. Disable export for development-only instances to keep file sizes small.
- ViewModels support nested composition: a ViewModel property can reference another ViewModel, enabling parent–child data hierarchies.

## Related

- [Data Binding](./data-binding.md)
- [Instances](./instances.md)
- [Properties](./properties.md)
