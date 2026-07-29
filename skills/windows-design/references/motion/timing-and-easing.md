# Timing and Easing

While motion is based in the real world, Windows apps are a digital medium with an expectation of speed and performance. Timing and easing are adjusted based on the purpose of the animation to create a coherent, natural feel.

## Signature / Usage

```csharp
// Fast Out, Slow In — use for entrance
cubic-bezier(0, 0, 0, 1)

// Slow Out, Fast In — use for exit
cubic-bezier(1, 0, 1, 1)
```

## Options / Props

### Standard animation duration values

WinUI 3 provides a set of standard animation durations used throughout the platform controls. Use these named `ThemeResource` values when building custom `Storyboard` animations.

| ThemeResource Name | Value |
|---|---|
| ControlNormalAnimationDuration | 250ms |
| ControlFastAnimationDuration | 167ms |
| ControlFasterAnimationDuration | 83ms |

### Easing curves

| Easing | Curve | Use For |
|---|---|---|
| Fast Out, Slow In (decelerate) | `cubic-bezier(0, 0, 0, 1)` | Objects or UI entering the scene (navigating or spawning). Object is met with extreme friction and slows to rest, feeling fast and responsive on entry. |
| Slow Out, Fast In (accelerate) | `cubic-bezier(1, 0, 1, 1)` | Objects or UI exiting the scene. Object gains momentum until it reaches escape velocity, feeling like it's making room for new content. |

## Notes

- Easing is the mechanism that ties together all Fluent motion experiences: it manipulates the velocity of an object as it travels to make it feel like it belongs in its environment.
- These two easing curves are the baseline for Fluent motion; apply "Fast Out, Slow In" to entrances and "Slow Out, Fast In" to exits.

## Related

- [Motion Overview](./motion-overview.md)
- [Directionality and Gravity](./directionality-and-gravity.md)
- [Motion in Practice](./motion-in-practice.md)
