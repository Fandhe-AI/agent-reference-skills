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
| `rive` | `Rive` | Automatically bind the instance to the Rive runtime (the hook sets the instance and schedules a single `bind()`) |

Forms: `{ useDefault: true }` / `{ name }` / `{ useNew: true }` without `rive` resolve an unbound instance; `{ rive }` alone resolves and binds the default instance; `{ name: 'X', rive }` and `{ useNew: true, rive }` resolve and bind.

### useGlobalViewModelInstance

```ts
useGlobalViewModelInstance(viewModel: ViewModel | null, globalName: string, options?): ViewModelInstance | null
```

Resolves an instance and registers it under a global view model slot name. A view model marked global in the editor is shared by the whole file (one slot per global, addressed by name).

| Option form | Description |
| --- | --- |
| `{ rive }` | The view model's default instance |
| `{ instanceName: 'Dark', rive }` | The instance with that name |
| `{ useNew: true, rive }` | A new blank instance |
| `{ instance: myInstance, rive }` | An instance you created yourself |

Passing `rive` registers the instance as the global and schedules the bind; omit it to resolve without binding.

```tsx
const themeViewModel = useViewModel(rive, { name: 'Theme' });
const themeInstance = useGlobalViewModelInstance(themeViewModel, 'Theme', { rive });
const { value: bg, setValue: setBg } = useViewModelInstanceColor('backgroundColor', themeInstance);

const names = rive?.globalViewModelNames();               // e.g. ["Theme", "Session"]
const current = rive?.globalViewModelInstance('Theme');   // ViewModelInstance | null
```

### Binding before the first frame

The view model hooks run after load, so the first frame has already rendered before they bind (even with `autoplay: false`). To set data before the first render, use `onRiveReady` in `useRive`; it receives the `Rive` instance synchronously before the state machine advances. Stage instances with `setViewModelInstance()` / `setGlobalViewModelInstance()` and flush once with `bind()`.

```tsx
const { RiveComponent } = useRive({
  src: 'your_file.riv',
  stateMachine: 'MyStateMachine',
  autoplay: true,
  autoBind: false,
  onRiveReady: (rive) => {
    const instance = rive.viewModelByName('MyViewModel').defaultInstance();
    instance.string('username').value = 'Rive';
    rive.setViewModelInstance(instance);
    rive.bind(); // flush the staged instances
  },
});
```

### Enums

`rive?.enums()` lists the file's enums; each has a name and a list of strings (enum values are string typed).

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
- Set every instance first, then call `bind()` once (`bind()` is costly). Hooks that resolve in the same render commit share one coalesced `bind()`. Use `onRiveReady` rather than `onLoad` for pre-render binding.
- Binding fills every slot you did not set, including the main view model instance, with that view model's default instance. `globalViewModelInstance()` never creates an instance; it returns `null` until set by a hook, `onRiveReady`, or `autoBind: true`.
- Nested property paths: pass the full `/`-delimited path as the first argument of a property hook (e.g. `'settings/theme/name'`).
- Observability: hook `value` updates re-render the component when the Rive instance changes a bound property (set via hook or by an internal binding).
- List properties can contain mixed View Model types in a single list.
- When setting image properties, always call `decodedImage.unref()` after passing it to `setValue` to avoid memory leaks.

## Related

- [useRive](./use-rive.md)
- [useStateMachineInput](./use-state-machine-input.md)
