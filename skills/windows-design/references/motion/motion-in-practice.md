# Motion in Practice

Timing, easing, directionality, and gravity work together to form the foundation of Fluent motion. Each has to be considered in the context of the others and applied appropriately to your app. There are three ways to apply Fluent motion fundamentals in practice.

## Options / Props

| Approach | Description |
|---|---|
| Implicit animation | Automatic tween and timing between values in a parameter change, using standardized values, for very simple Fluent motion. |
| Built-in animation | System components (common controls, shared motion) are "Fluent by default" — fundamentals are already applied consistently with their implied usage. |
| Custom animation | When the system doesn't yet provide an exact motion solution for a scenario, use the baseline fundamental recommendations (timing, easing, directionality, gravity) as a starting point. |

## Example: transition timings

| Element | Direction | Effect | Duration | Easing |
|---|---|---|---|---|
| Transition (page) | Forward Out | Fade out | 150ms | Default Accelerate |
| Transition (page) | Forward In | Slide up 150px | 300ms | Default Decelerate |
| Transition (page) | Backward Out | Slide down 150px | 150ms | Default Accelerate |
| Transition (page) | Backward In | Fade in | 300ms | Default Decelerate |
| Object | Expand | Grow | 300ms | Standard |
| Object | Contract | Grow | 150ms | Default Accelerate |

## Notes

- This page ties together Timing and Easing, Directionality and Gravity, and Implicit Animations into concrete duration/easing recommendations for common transition and object-state scenarios.
- Prefer built-in animation (system-provided) first, implicit animation second, and hand-rolled custom animation only when neither covers the scenario.

## Related

- [Timing and Easing](./timing-and-easing.md)
- [Directionality and Gravity](./directionality-and-gravity.md)
- [Implicit Animations](./implicit-animations.md)
