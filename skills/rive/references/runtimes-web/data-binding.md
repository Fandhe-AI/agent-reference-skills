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
  stateMachines: "Main",
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

### Property accessors on ViewModelInstance

| Accessor | Returns | Description |
|----------|---------|-------------|
| `vmi.boolean(name)` | `BooleanProperty` | Boolean property |
| `vmi.string(name)` | `StringProperty` | String property |
| `vmi.number(name)` | `NumberProperty` | Floating-point property |
| `vmi.color(name)` | `ColorProperty` | Color property |
| `vmi.trigger(name)` | `TriggerProperty` | Trigger property |
| `vmi.enum(name)` | `EnumProperty` | Enumeration property |
| `vmi.viewModel(name)` | `ViewModelInstance` | Nested View Model |
| `vmi.list(name)` | `ListProperty` | Dynamic list of VMIs |
| `vmi.image(name)` | `ImageProperty` | Raster image property |
| `vmi.artboard(name)` | `ArtboardProperty` | Artboard swap property |

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
// Path string (forward-slash delimited)
const n = vmi.number("Card/rating");
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
- Always call `unref()` on decoded image assets once assigned to free memory.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [rive-methods.md](./rive-methods.md)
- [state-machine-playback.md](./state-machine-playback.md)
- [loading-assets.md](./loading-assets.md)
