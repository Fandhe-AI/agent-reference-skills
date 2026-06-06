# AnimationAction

Schedules the playback of an `AnimationClip` on an `AnimationMixer`. Controls when the clip plays, how it loops, fade behavior, time scaling, and crossfading with other actions.

## Signature / Usage

```js
// Do not instantiate directly — use AnimationMixer.clipAction()
const mixer = new THREE.AnimationMixer(mesh);
const action = mixer.clipAction(clip);
action.play();
```

## Constructor

```js
new AnimationAction(mixer, clip, localRoot, blendMode)
```

| Parameter | Type | Description |
|-----------|------|-------------|
| mixer | AnimationMixer | The mixer that controls this action |
| clip | AnimationClip | The animation clip holding keyframes |
| localRoot | Object3D | Root object for the action (default: `null`) |
| blendMode | NormalAnimationBlendMode \| AdditiveAnimationBlendMode | How the animation blends |

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| blendMode | number | NormalAnimationBlendMode | Blending mode when multiple animations play simultaneously |
| clampWhenFinished | boolean | false | If true, pauses on last frame when finished; if false, disables the action |
| enabled | boolean | true | If false, the action has no effect |
| loop | LoopRepeat \| LoopOnce \| LoopPingPong | LoopRepeat | The loop mode |
| paused | boolean | false | Whether playback is paused |
| repetitions | number | Infinity | Number of clip repetitions (ignored when loop is LoopOnce) |
| time | number | 0 | Local time in seconds, clamped/wrapped to `[0, clip.duration]` |
| timeScale | number | 1 | Scaling factor for time; 0 pauses, negative plays backwards |
| weight | number | 1 | Influence weight in range `[0, 1]` for blending |
| zeroSlopeAtEnd | boolean | true | Enables smooth interpolation at clip end |
| zeroSlopeAtStart | boolean | true | Enables smooth interpolation at clip start |

## Methods

**Playback control:**

| Method | Returns | Description |
|--------|---------|-------------|
| play() | AnimationAction | Starts/resumes playback |
| stop() | AnimationAction | Stops playback and resets |
| reset() | AnimationAction | Resets time, paused, enabled, weight, timeScale |
| halt(duration) | AnimationAction | Decelerates speed to 0 over given duration |

**Fading and transitions:**

| Method | Returns | Description |
|--------|---------|-------------|
| fadeIn(duration) | AnimationAction | Fades weight from 0 to 1 over duration |
| fadeOut(duration) | AnimationAction | Fades weight from 1 to 0 over duration |
| crossFadeFrom(fadeOutAction, duration, warp) | AnimationAction | This action fades in while another fades out |
| crossFadeTo(fadeInAction, duration, warp) | AnimationAction | This action fades out while another fades in |
| stopFading() | AnimationAction | Stops any active fade |
| warp(startTimeScale, endTimeScale, duration) | AnimationAction | Gradually changes playback speed |
| stopWarping() | AnimationAction | Stops scheduled warping |

**Configuration:**

| Method | Returns | Description |
|--------|---------|-------------|
| setLoop(mode, repetitions) | AnimationAction | Sets loop mode and repetition count |
| setDuration(duration) | AnimationAction | Sets the duration of a single loop |
| setEffectiveTimeScale(timeScale) | AnimationAction | Sets effective time scale |
| setEffectiveWeight(weight) | AnimationAction | Sets effective weight |
| startAt(time) | AnimationAction | Schedules when the action should start (global mixer time) |
| syncWith(action) | AnimationAction | Synchronizes time and timeScale with another action |

**State queries:**

| Method | Returns | Description |
|--------|---------|-------------|
| isRunning() | boolean | True if currently playing |
| isScheduled() | boolean | True if play() has been called |
| getClip() | AnimationClip | Returns the associated clip |
| getMixer() | AnimationMixer | Returns the controlling mixer |
| getRoot() | Object3D | Returns the root object |
| getEffectiveTimeScale() | number | Returns effective time scale |
| getEffectiveWeight() | number | Returns effective weight |

## Notes

- Do not use the constructor directly; always obtain actions via `AnimationMixer.clipAction()`.
- `clampWhenFinished` only takes effect if `loop` is set to `LoopOnce`.
- Methods returning `AnimationAction` support method chaining.

## Related

- [AnimationMixer](./AnimationMixer.md)
- [AnimationClip](./AnimationClip.md)
