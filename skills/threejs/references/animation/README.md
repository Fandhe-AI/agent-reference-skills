# Animation

Three.js animation system classes for playing, blending, and managing keyframe animations.

| Name | Description | Path |
|------|-------------|------|
| AnimationAction | Controls playback of an AnimationClip on a mixer (play, stop, fade, crossfade) | [AnimationAction.md](./AnimationAction.md) |
| AnimationClip | Reusable set of KeyframeTracks representing a single animation | [AnimationClip.md](./AnimationClip.md) |
| AnimationMixer | Player for animations on a scene object; must be updated each frame | [AnimationMixer.md](./AnimationMixer.md) |
| AnimationObjectGroup | Group of objects sharing a single animation state | [AnimationObjectGroup.md](./AnimationObjectGroup.md) |
| AnimationUtils | Static utilities for subclipping, additive conversion, and array manipulation | [AnimationUtils.md](./AnimationUtils.md) |
| KeyframeTrack | Base class for timed keyframe sequences targeting a scene property | [KeyframeTrack.md](./KeyframeTrack.md) |
| PropertyBinding | Internal binding between a track name and a real scene graph property | [PropertyBinding.md](./PropertyBinding.md) |
| PropertyMixer | Internal buffered property manager for weighted animation blending | [PropertyMixer.md](./PropertyMixer.md) |
| tracks/ | Concrete KeyframeTrack subclasses (Boolean, Color, Number, Quaternion, String, Vector) | [tracks/README.md](./tracks/README.md) |
