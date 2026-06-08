# Advanced Uses

Custom `rafDriver`s (v0.6.0+) for controlling when and how often Theatre.js processes animation computations. Enables synchronization with other libraries and specialized rendering environments.

## Signature / Usage

```javascript
import { createRafDriver } from '@theatre/core'

// Create a custom 5 fps driver
const rafDriver = createRafDriver({ name: 'my-driver' })
setInterval(() => rafDriver.tick(performance.now()), 200)

// Use with sequence playback
sheet.sequence.play({ rafDriver })

// Use with onChange listeners
import { onChange } from '@theatre/core'
onChange(obj.pointer.x, (x) => { mesh.position.x = x }, rafDriver)

// Integrate with Studio
import studio from '@theatre/studio'
studio.initialize({ __experimental_rafDriver: rafDriver })
```

## `createRafDriver(opts)` Options

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Identifier shown in debugging |

Returned driver object:

| Member | Type | Description |
|--------|------|-------------|
| `tick(timestamp)` | `(number) => void` | Advance all computations to the given timestamp |
| `start()` | `() => void` | Optional lifecycle callback when listeners attach |
| `stop()` | `() => void` | Optional lifecycle callback when all listeners detach |

## Notes

- The default Theatre.js driver uses `requestAnimationFrame`; replace it only when you need synchronization with another loop
- With `@react-three/fiber`: wrap components in `<RafDriverProvider driver={rafDriver}>` to scope the driver to that subtree
- With XR environments: use `xr.requestAnimationFrame()` as the tick source
- Multiple drivers can coexist on the same page
- `start`/`stop` callbacks let you pause the driver when no listeners are active, saving resources

## Related

- [Sequences](./sequences.md)
- [Using Audio](./audio.md)
