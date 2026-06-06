# AnimationClip

A reusable set of `KeyframeTrack` instances representing a single animation (e.g., a walk cycle or a jump). Clips are typically created automatically by loaders such as `GLTFLoader`.

## Signature / Usage

```js
// Usually obtained from a loaded model
const { animations } = await loader.loadAsync('model.glb');
const walkClip = THREE.AnimationClip.findByName(animations, 'walk');
const action = mixer.clipAction(walkClip);
action.play();
```

## Constructor

```js
new AnimationClip(name, duration, tracks, blendMode)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| name | string | '' | Clip name |
| duration | number | -1 | Duration in seconds; if negative, calculated from tracks |
| tracks | Array\<KeyframeTrack\> | — | Array of keyframe tracks |
| blendMode | NormalAnimationBlendMode \| AdditiveAnimationBlendMode | NormalAnimationBlendMode | Blending behavior |

## Properties

| Name | Type | Description |
|------|------|-------------|
| blendMode | number | Blending behavior when multiple animations run simultaneously |
| duration | number | Duration in seconds |
| name | string | Clip name |
| tracks | Array\<KeyframeTrack\> | Keyframe tracks composing this clip |
| userData | Object | Custom data (avoid storing function references) |
| uuid | string | Read-only unique identifier |

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| clone() | AnimationClip | Returns a copy |
| optimize() | AnimationClip | Removes redundant sequential keys from tracks |
| resetDuration() | AnimationClip | Sets duration to the longest track's duration |
| toJSON() | Object | Serializes to JSON |
| trim() | AnimationClip | Trims all tracks to the clip's duration |
| validate() | boolean | Validates all tracks; returns true if valid |

## Static Methods

| Method | Returns | Description |
|--------|---------|-------------|
| AnimationClip.findByName(objectOrClipArray, name) | AnimationClip | Finds a clip by name |
| AnimationClip.parse(json) | AnimationClip | Creates a clip from a JSON object |
| AnimationClip.toJSON(clip) | Object | Serializes a clip to JSON |
| AnimationClip.CreateFromMorphTargetSequence(name, morphTargetSequence, fps, noLoop) | AnimationClip | Creates a clip from a morph target sequence |
| AnimationClip.CreateClipsFromMorphTargetSequences(morphTargets, fps, noLoop) | Array\<AnimationClip\> | Creates multiple clips from morph target sequences |

## Notes

- `parseAnimation` (parses `animation.hierarchy` format) is deprecated since r175.
- When loading from GLTF/FBX, prefer `AnimationClip.findByName()` over array indexing to select clips by name.

## Related

- [AnimationMixer](./AnimationMixer.md)
- [AnimationAction](./AnimationAction.md)
- [KeyframeTrack](./KeyframeTrack.md)
