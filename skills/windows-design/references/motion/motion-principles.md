# Motion Principles

Five principles guide the use of motion in Windows: Connected, Consistent, Responsive, Delightful, and Resourceful.

## Options / Props

| Principle | Guidance | Example |
|---|---|---|
| Connected | Elements that change position and size should visually connect from one state to another, even if they aren't connected under the hood. This lowers the cognitive load of static state changes. | A window feels like the same window as it transitions between floating, snapped, and maximized. |
| Consistent | Surfaces that share the same UI entry point should invoke and dismiss the same way. Each transition should respect the timing, easing, and direction of other elements so a surface feels cohesive. | All taskbar flyouts slide up when invoked, and slide down when dismissed. |
| Responsive | Clear indicators show the system recognizes and adapts gracefully to different input, postures, and orientations. | Taskbar icons spread out when a keyboard is detached; window edges show different visuals for cursor vs. touch input. |
| Delightful | Motion adds personality and energy, transforming simple actions into brief, purposeful moments of joy. | Minimizing a window causes its app icon to bounce down; restoring bounces it back up. |
| Resourceful | Avoid custom animations where possible — use existing animation resources (such as WinUI 3 controls) for page transitions, in-page focus, and micro interactions. If you can't use WinUI controls, mimic existing OS behaviors. | Page transitions, connected animations, and animated icons are the recommended WinUI controls for delightful, necessary motion. |

## Notes

- These principles apply across all Windows motion scenarios — page transitions, connected animations, implicit animations, and parallax should each be evaluated against them.
- Prefer built-in system components over custom animation; system controls are "Fluent by default."

## Related

- [Motion Overview](./motion-overview.md)
- [Timing and Easing](./timing-and-easing.md)
- [Directionality and Gravity](./directionality-and-gravity.md)
