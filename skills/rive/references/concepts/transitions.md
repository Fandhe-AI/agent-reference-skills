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
| Pause source when exiting | Pauses the animation in the state being left as soon as the transition begins (current docs name: **Pause Source When Exiting**) |
| Allow exit during transition | Controls whether the State Machine can leave a transition before it finishes (e.g. Idle → Hover, cursor leaves: transitions back to Idle immediately) |
| Interpolation | Blend curve: Linear (default), Cubic, or others (Hold) |
| Conditions | Rules that must be satisfied for the transition to fire (source value / operator / comparison value; multiple conditions are "and") |
| Actions | Operations that run at transition **Start** or **End** (set property values, report events, align targets, control focus, fire a scripted action) |

### Condition structure

A condition has three parts: **Source value** (the value or event watched), **Operator** (how it is compared), **Comparison value** (what it is compared against). Example: `isWalking` (source) equals (operator) `true` (comparison) for Idle → Walk.

- Source values: View Model properties, events, and built-in properties such as artboard width, height and ratio.
- Operators: equals, does not equal, greater than, greater than or equal to, less than, less than or equal to; available comparisons depend on the value type.
- Comparison value: a fixed value (`true`, `100`, `"mobile"`) or data bound to another property (e.g. `speed` greater than a data-bound `walkThreshold`).
- Multiple conditions on one transition: all must be met.
- Without conditions, transitions fire as soon as they are reached, which can make the State Machine rapidly cycle between states or skip directly to one animation.

### Action timing

Each transition action runs at **Start** (when the transition begins) or **End** (after the transition completes). Add via the Actions tab: with a transition selected click `+` and select an action type. Actions can also fire at the start or end of a state (see States).

### Randomize exit

Select the origin state and enable **Randomize Exit**: the state lists each outgoing path and lets you assign a weight to each. Higher weight, higher chance (weights 3 and 1 give 75% / 25%).

### Disabling a transition

Temporarily disable a transition without deleting it (e.g. to isolate part of a state machine for testing): select it and click the enable/disable icon in the transition panel, or right-click it on the canvas and choose **Disable transition** / **Enable transition**.

## Notes

- Selecting multiple transitions lets you update multiple properties at once.
- A transition path is one-directional; to move back, create another transition path starting from the other state.
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
