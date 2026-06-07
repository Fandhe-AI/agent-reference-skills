# Enums

Data types that restrict a ViewModel property to a predefined set of named options. Enums prevent invalid values and make designer intent explicit when a property should only hold a fixed set of states (e.g., game modes, layout variants, animation states).

## Signature / Usage

Enums are defined in the Data panel and used as ViewModel property types. At runtime they are accessed via the ViewModel Instance API.

```typescript
const vmi = riveInstance.viewModelInstance;
const mode = vmi.enum("gameMode");
console.log(mode.value); // e.g., "easy"
mode.value = "hard";
```

## Options / Props

| Kind | Description |
| --- | --- |
| System Enums | Built-in editor enums (e.g., Horizontal Align) provided by Rive |
| Custom Enums | User-defined sets created in the Data panel |

### Creating a Custom Enum (editor)

1. Open the Data panel → click `+` → select Enum.
2. Add named options.
3. Add an Enum property to a ViewModel and select the custom enum type.
4. Set the default value in the right sidebar.

## Notes

- Enum values are referenced by their string name at runtime.
- When binding an Enum property to a numeric scene property, the "System Enum to Uint converter" is applied automatically.
- Enums control **Solo** visibility: map each enum value to a corresponding Solo to switch between component variants; a "Convert to Number" converter is required in this case.
- Enums provide stronger type safety than raw strings or numbers for fixed-option properties.

## Related

- [Properties](./properties.md)
- [Data Binding](./data-binding.md)
- [Converters](./converters.md)
