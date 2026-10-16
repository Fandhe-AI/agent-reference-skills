# propEffect

`propEffect()` applies the output of motion values to the properties of a JavaScript object, useful with libraries like Three.js.

## Signature / Usage

```
import { propEffect } from "motion"

const pos = { x: 0, y: 0, z: 0 }
const x = motionValue(0)

const cancel = propEffect(pos, { x })

// Set x on pos to 100
x.set(100)

// Animate x on pos to 200
animate(x, 200)

cancel()
```

Three.js:

```
const cube = new THREE.Mesh(geometry, material)
const x = motionValue(0)

propEffect(cube.position, { x })
```

Accepts a single object plus a map of motion values:

```
const data = { opacity: 0, x: 100 }
const opacity = motionValue(0)

propEffect(data, { opacity })
```

## Notes

- Updates are applied once per frame during the render step of the frameloop.
- Any motion value can be provided, including `mapValue` and `transformValue`.
- Returns a cleanup function that stops applying the motion values.

## Related

- [style-effect](./style-effect.md)
- [three](./three.md)
- [motion-value](./motion-value.md)
- [frame](./frame.md)
