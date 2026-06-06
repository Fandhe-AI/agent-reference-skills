# AnimationMixer

A player for animations on a particular scene object. For multiple independently animated objects, create one mixer per object. Must be updated each frame via `mixer.update(delta)`.

## Signature / Usage

```js
const mixer = new THREE.AnimationMixer(mesh);
const action = mixer.clipAction(clip);
action.play();

// In render loop:
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}
animate();
```

## Constructor

```js
new AnimationMixer(root: Object3D)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| root | Object3D | The object whose animations this mixer plays |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| time | number | 0 | Global mixer time in seconds |
| timeScale | number | 1 | Scaling factor for global time; set to 0 to pause all actions, back to 1 to resume |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| clipAction(clip, optionalRoot?, blendMode?) | AnimationAction | Returns (or creates) an action for the given clip. Always returns the same instance for the same parameters. |
| existingAction(clip, optionalRoot?) | AnimationAction \| null | Returns an existing action, or null if not found |
| getRoot() | Object3D | Returns the mixer's root object |
| setTime(time) | AnimationMixer | Jumps to a specific time (scaled by `timeScale`) |
| stopAllAction() | AnimationMixer | Deactivates all scheduled actions |
| update(deltaTime) | AnimationMixer | Advances mixer time and updates animations; call once per frame |
| uncacheAction(clip, optionalRoot?) | void | Frees memory for an action; call `action.stop()` first |
| uncacheClip(clip) | void | Frees memory for a clip; stop all related actions first |
| uncacheRoot(root) | void | Frees memory for a root object; stop all related actions first |

## Notes

- `clipAction()` is the primary way to obtain an `AnimationAction`; it caches internally so repeated calls with the same arguments return the same object.
- Always call `stop()` on related actions before using any `uncache*` method to avoid memory leaks.
- Use `timeScale = 0` to pause all animations without losing their state.

## Related

- [AnimationAction](./AnimationAction.md)
- [AnimationClip](./AnimationClip.md)
- [AnimationObjectGroup](./AnimationObjectGroup.md)
