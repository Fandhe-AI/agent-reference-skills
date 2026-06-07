# Transitions

Directed connections between states in the State Machine graph that define when and how the machine moves from one state to another.

## Signature / Usage

Create a transition by hovering over the edge of a state until an ellipse appears, then dragging to the destination state. Multiple transitions between the same states create "or" (any-match) logic; multiple conditions on one transition create "and" (all-match) logic.

```text
State A --[condition(s)]--> State B
```

## Options / Props

| Property | Description |
| --- | --- |
| Duration | Time (ms) for the cross-fade blend between states; 0 = instant snap |
| Exit Time | Optional: time or percentage into the source animation before the transition can fire; 100% waits for animation completion |
| Pause When Exiting | Pauses the outgoing animation during the transition, preventing overlap |
| Interpolation | Blend curve: Linear, Cubic, or Hold |
| Conditions | Rules that must be satisfied for the transition to fire (Boolean, Number, Trigger, or Script) |
| Actions | Operations that run at transition start or end (set property, report event, align target, control focus, run script) |

## Notes

- **Condition types:**
  - Boolean — fires when a named input equals true or false
  - Number — fires when a named input satisfies an equality or comparison (=, >, <)
  - Trigger — fires once when the named trigger input is activated
  - Custom Script — complex conditions via scripting API
- Multiple transitions from the same source state act as an "or": whichever condition is satisfied first wins.
- Longer durations create smoother blending between state animations.
- Actions on a transition can be set to run at transition start or completion.

## Related

- [State Machine](./state-machine.md)
- [States](./states.md)
- [Inputs](./inputs.md)
