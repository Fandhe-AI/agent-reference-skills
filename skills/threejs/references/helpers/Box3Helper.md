# Box3Helper

Visualizes a [Box3](https://threejs.org/docs/pages/Box3.html) instance as a wireframe box. Unlike `BoxHelper`, it wraps a `Box3` math object directly rather than a scene object.

## Signature / Usage

```js
const box = new THREE.Box3();
box.setFromCenterAndSize(new THREE.Vector3(1, 1, 1), new THREE.Vector3(2, 1, 3));
const helper = new THREE.Box3Helper(box, 0xffff00);
scene.add(helper);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `box` | `Box3` | — | The box to visualize |
| `color` | `number \| Color \| string` | `0xffff00` | Wireframe color |

## Properties

| Name | Type | Description |
|------|------|-------------|
| `.box` | `Box3` | The box being visualized |

## Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `.dispose()` | `()` | Frees GPU-related resources |

## Related

- [BoxHelper](./BoxHelper.md)
