# Data Binding

Connects React application state to Rive animated elements through View Models and View Model Instances. Replaces the deprecated `useStateMachineInput` pattern.

## Signature / Usage

```tsx
import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceBoolean } from '@rive-app/react-webgl2';

export default function Example() {
  const { rive, RiveComponent } = useRive({
    src: 'your_file.riv',
    autoBind: true,
  });

  const viewModel = useViewModel(rive);
  const instance = useViewModelInstance(viewModel, { useDefault: true, rive });

  const { value: isActive, setValue: setIsActive } =
    useViewModelInstanceBoolean('isToggleOn', instance);

  return (
    <>
      <RiveComponent />
      <button onClick={() => setIsActive(!isActive)}>Toggle</button>
    </>
  );
}
```

## Options / Props

### useViewModel

```ts
useViewModel(rive: Rive | null, options?: { name?: string; index?: number }): ViewModel | null
```

| Option | Type | Description |
| --- | --- | --- |
| `name` | `string` | Select a View Model by name |
| `index` | `number` | Select a View Model by index |
| _(no option)_ | — | Returns the artboard's default View Model |

### useViewModelInstance

```ts
useViewModelInstance(viewModel: ViewModel | null, options?: UseViewModelInstanceOptions): ViewModelInstance | null
```

| Option | Type | Description |
| --- | --- | --- |
| `useDefault` | `boolean` | Use the editor's "Default" named instance |
| `useNew` | `boolean` | Create a new blank instance |
| `name` | `string` | Select a named instance |
| `index` | `number` | Select an instance by index |
| `rive` | `Rive` | Automatically bind the instance to the Rive runtime |

### Property hooks

All property hooks share the signature:
```ts
useViewModelInstance<Type>(propertyPath: string, instance: ViewModelInstance | null, options?): PropertyState
```

Use forward-slash-delimited paths for nested properties (e.g. `'settings/theme/name'`).

| Hook | Return members | Description |
| --- | --- | --- |
| `useViewModelInstanceBoolean` | `value`, `setValue` | Boolean property |
| `useViewModelInstanceNumber` | `value`, `setValue` | Number property |
| `useViewModelInstanceString` | `value`, `setValue` | String property |
| `useViewModelInstanceEnum` | `value`, `setValue`, `values` | Enum property (string-typed; `values` lists all options) |
| `useViewModelInstanceColor` | `value`, `setValue`, `setRgb`, `setRgba`, `setAlpha`, `setOpacity` | Color property |
| `useViewModelInstanceTrigger` | `trigger` | Returns a function to fire the trigger; accepts `{ onTrigger }` callback option |
| `useViewModelInstanceImage` | `setValue` | Set an image from a decoded `RiveImageAsset` |
| `useViewModelInstanceList` | `length`, `addInstance`, `addInstanceAt`, `removeInstance`, `removeInstanceAt`, `getInstanceAt`, `swap` | Dynamic list of View Model instances |
| `useViewModelInstanceArtboard` | `setValue` | Swap an artboard reference at runtime |

## Notes

- Hook values update automatically (triggering re-renders) when the Rive instance changes a bound property.
- For triggers, use the `onTrigger` callback option rather than checking return values.
- Properties require a state machine or artboard advance to apply changes to bound elements.
- `autoBind: true` in `useRive` is the preferred pattern when using the file's default View Model and instance; the bound instance is also accessible via `rive?.viewModelInstance`.
- List properties can contain mixed View Model types in a single list.
- When setting image properties, always call `decodedImage.unref()` after passing it to `setValue` to avoid memory leaks.

## Related

- [useRive](./use-rive.md)
- [useStateMachineInput](./use-state-machine-input.md)
