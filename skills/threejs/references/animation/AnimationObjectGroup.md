# AnimationObjectGroup

A group of objects that share a single animation state. Pass an `AnimationObjectGroup` as the root to `AnimationMixer` or `clipAction()` to animate multiple objects together.

## Signature / Usage

```js
const group = new THREE.AnimationObjectGroup(meshA, meshB);
const mixer = new THREE.AnimationMixer(group);
const action = mixer.clipAction(clip);
action.play();

// Add/remove objects dynamically
group.add(meshC);
group.remove(meshA);
```

## Constructor

```js
new AnimationObjectGroup(...objects: Object3D)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| ...objects | Object3D | Initial objects to include in the group |

## Properties

| Name | Type | Description |
|------|------|-------------|
| isAnimationObjectGroup | boolean | Read-only type flag; always `true` |
| uuid | string | Read-only unique identifier |

## Methods

| Method | Description |
|--------|-------------|
| add(...objects: Object3D) | Adds objects to the group |
| remove(...objects: Object3D) | Removes objects from the group |
| uncache(...objects: Object3D) | Frees memory resources for the given objects |

## Notes

- All objects in the group must have compatible animated properties (same property names and value sizes).
- A property can be controlled either through a group or directly on an object — not both at the same time.
- Cache management must be done at the group level; individual object uncaching is done via `uncache()`.

## Related

- [AnimationMixer](./AnimationMixer.md)
- [AnimationAction](./AnimationAction.md)
