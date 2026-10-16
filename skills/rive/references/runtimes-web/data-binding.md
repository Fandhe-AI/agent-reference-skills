# Data Binding

Connect JavaScript code to animated properties through View Models and View Model Instances (VMI).

## Signature / Usage

```ts
import { Rive } from "@rive-app/webgl2";

const r = new Rive({
  src: "scene.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  autoplay: true,
  autoBind: true,          // auto-bind default ViewModel with default instance
  stateMachine: "Main",
  onLoad: () => {
    const vmi = r.viewModelInstance;

    // Read / write properties
    vmi.boolean("isVisible").value = true;
    vmi.string("label").value = "Hello, Rive!";
    vmi.number("score").value = 42;
    vmi.trigger("onClick").trigger();

    // Observe changes
    vmi.number("score").on((event) => {
      console.log("score changed:", event.data);
    });
  },
});
```

## Options / Props

### Getting View Models from a Rive instance

| Method | Signature | Description |
|--------|-----------|-------------|
| `viewModelByName` | `(name: string) => ViewModel` | Get View Model by name |
| `viewModelByIndex` | `(index: number) => ViewModel` | Get View Model by index |
| `defaultViewModel` | `() => ViewModel` | Get the file's default View Model |
| `viewModelCount` | `number` | Total number of View Models |
| `enums` | `() => DataEnum[]` | Enums defined in the file; each has a name and a list of strings |

The same `viewModelByName` / `viewModelByIndex` / `defaultViewModel` lookups are also available on the underlying file instance (`file.getInstance()`); `RiveFile` itself exposes `viewModelByName`.

```ts
const enums = r.enums();
const props = viewModel.properties; // each entry has `name` and `type`; "enum" entries also carry `enumName`, matchable against r.enums()
```

### Creating View Model Instances

| Method | Signature | Description |
|--------|-----------|-------------|
| `vm.instance()` | `() => ViewModelInstance` | Blank instance (all defaults: 0, "", false, …) |
| `vm.defaultInstance()` | `() => ViewModelInstance` | Designer-designated primary instance |
| `vm.instanceByIndex` | `(index: number) => ViewModelInstance` | Instance by index |
| `vm.instanceByName` | `(name: string) => ViewModelInstance` | Instance by editor name |
| `vm.instanceCount` | `number` | Total number of named instances |

### Binding an instance

```ts
r.bindViewModelInstance(vmi);   // manual binding (autoBind: false)
// or
const vmi = r.viewModelInstance; // read bound instance (autoBind: true)
```

`bindViewModelInstance(vmi)` is shorthand for `setViewModelInstance(vmi)` followed by `bind()`. To apply several instances, stage each with a `set` method and call `bind()` once (`bind()` is much more costly than `set`):

```ts
r.setViewModelInstance(vmi);
r.setGlobalViewModelInstance("Theme", themeVmi);
r.bind();
```

Initial values are not applied to bound elements until the state machine or artboard advances. Bind to a state machine when one is used; bind to an artboard only for static or linear-animation files.

### Auto-Binding

`autoBind: true` binds the artboard's default view model (the one selected in the editor dropdown) with its default instance ("Default" in the editor) to both the state machine and the artboard. Read it back with `r.viewModelInstance`. It also creates a default instance for every global view model in the file, so `globalViewModelInstance(name)` is populated by `onLoad`.

### Global View Models

A view model marked global in the editor is shared across the whole file; the file holds one slot per global view model, addressed by name.

| Method | Signature | Description |
|--------|-----------|-------------|
| `globalViewModelNames` | `() => string[]` | Global view model names in file order (also on `RiveFile`) |
| `setGlobalViewModelInstance` | `(name: string, instance: ViewModelInstance) => boolean` | Stage an instance in the slot; `false` if `name` is not a global view model. Apply with `bind()` |
| `globalViewModelInstance` | `(name: string) => ViewModelInstance \| null` | Read the slot; `null` until set, or created by `bind()` / `autoBind: true` |

```ts
const themeVMI = r.viewModelByName("Theme").instanceByName("Dark");
r.setGlobalViewModelInstance("Theme", themeVMI); // staged
r.bind();                                        // also creates a default main instance
const current = r.globalViewModelInstance("Theme");
```

### Property accessors on ViewModelInstance

| Accessor | Returns | Description |
|----------|---------|-------------|
| `vmi.boolean(name)` | `ViewModelInstanceBoolean` | Boolean property |
| `vmi.string(name)` | `ViewModelInstanceString` | String property |
| `vmi.number(name)` | `ViewModelInstanceNumber` | Floating-point property |
| `vmi.color(name)` | `ViewModelInstanceColor` | Color property |
| `vmi.trigger(name)` | `ViewModelInstanceTrigger` | Trigger property |
| `vmi.enum(name)` | `ViewModelInstanceEnum` | Enumeration property |
| `vmi.viewModel(name)` | `ViewModelInstance` | Nested View Model |
| `vmi.list(name)` | `ViewModelInstanceList` | Dynamic list of VMIs |
| `vmi.image(name)` | `ViewModelInstanceAssetImage` | Raster image property |
| `vmi.font(name)` | `ViewModelInstanceAssetFont` | Font property |
| `vmi.artboard(name)` | `ViewModelInstanceArtboard` | Artboard swap property |
| `vmi.viewModelName` | `string` | Name of the ViewModel the instance was created from |
| `vmi.properties` | — | Properties available on the ViewModel |

### Font property

```ts
const headingFont = vmi.font("headingFont");
const res = await fetch("/Orbitron.ttf");
headingFont.value = await decodeFont(new Uint8Array(await res.arrayBuffer()));
```

### ColorProperty helpers

```ts
const c = vmi.color("bgColor");
c.value = 0xFF000000;            // ARGB integer
c.rgb(255, 0, 0);                // RGB
c.rgba(255, 0, 0, 128);          // RGB + alpha
c.argb(128, 255, 0, 0);          // ARGB
c.opacity(0.5);                  // alpha only
```

### Nested property path

```ts
// Chain
const n = vmi.viewModel("Card").number("rating");
// Path string (forward-slash delimited, ends with the property of interest)
const n = vmi.number("Card/rating");
const deep = vmi.number("My Nested View Model/My Second Nested VM/My Nested Number");
```

### Observability

```ts
const prop = vmi.number("score");
prop.on((event) => console.log(event.data));   // subscribe
prop.off(callback);                             // remove specific listener
prop.off();                                     // remove all listeners
```

### List property

```ts
const list = vmi.list("todos");
list.length;                          // number of items
list.addInstance(todoVMI);            // append
list.removeInstance(todoVMI);         // remove by reference
list.removeInstanceAt(0);             // remove by index
list.swap(0, 1);                      // swap two items
```

### Image property

```ts
const img = vmi.image("avatar");
const decoded = await rive.decodeImage(new Uint8Array(await res.arrayBuffer()));
img.value = decoded;
decoded.unref();                      // release after setting
img.value = null;                     // clear
```

### Artboard property (component swap)

```ts
const artboardProp = vmi.artboard("Character");
const assetsFile = new RiveFile({ src: "assets.riv", onLoad: () => {
  artboardProp.value = assetsFile.getBindableArtboard("Hero");
}});
assetsFile.init();
```

## Notes

- Data Binding is the modern replacement for the legacy `stateMachineInputs()` API.
- Pass `autoBind: true` to automatically bind the default View Model with its default instance.
- Nested View Models can be accessed via method chaining or forward-slash path strings.
- The source no longer uses the `*Property` type names (`ArtboardProperty`, `BooleanProperty`, ...); use the `ViewModelInstance*` names above.
- Setting a property value does not update bound elements until the state machine or artboard advances; observers fire when changes are applied by an advance.
- Always call `unref()` on decoded image assets once assigned to free memory.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [rive-methods.md](./rive-methods.md)
- [state-machine-playback.md](./state-machine-playback.md)
- [loading-assets.md](./loading-assets.md)
