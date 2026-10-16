# Accessibility: Reduced Motion

Pass the user's reduced-motion preference into a Rive file through a data binding property and use it to adapt motion.

## Signature / Usage

Rive does not detect the preference itself; the app or platform detects it (on web, typically the `prefers-reduced-motion` media feature) and writes it to a Boolean data binding property such as `prefersReducedMotion`. Speed-to-zero converter chain from the docs:

```text
Converter group: BooleanToSpeed
  1. Toggle            (prefersReducedMotion true -> output false)
  2. Convert to Number (true = 1, false = 0)
Bind the nested component's Speed to prefersReducedMotion with the BooleanToSpeed converter.
When prefersReducedMotion is true, animation speed is 0.
```

## Options / Props

Common strategies:

| Strategy | Description |
| --- | --- |
| Separate reduced-motion path | For complex or decorative motion, build separate state machine paths for full and reduced motion; a `prefersReducedMotion` Boolean chooses which runs |
| Reduce or disable animation speed | Bind transition durations, timeline speeds, or animation speeds to a property (for example normal speed vs `0` or lower) |
| Replace motion with non-motion feedback | Use opacity or color changes instead of movement, scale, rotation, or bounce |
| Reduce distance | Shrink travel distance, or replace large movement with a small offset and fade |

## Notes

- Rive does not automatically apply reduced motion; authors decide which motion is essential versus decorative and design the reduced-motion experience.
- At runtime use data binding to pass the preference into the file. Runtimes may expose a built-in reduced motion value in the future; for now pass it yourself.
- Use the file's state machine transitions, timeline speeds, or bound animation properties to react to the property.

## Related

- [Accessibility: Semantics](./accessibility-semantics.md)
- [Accessibility: Focus](./accessibility-focus.md)
- [Converters](./converters.md)
- [Data Binding](./data-binding.md)
- [State Machine](./state-machine.md)
