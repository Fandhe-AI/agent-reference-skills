# States

Nodes in the State Machine graph that represent distinct animation conditions. Each state holds a timeline animation (or blend of animations) that plays while the state is active.

## Signature / Usage

States appear as nodes on the State Machine graph. They are connected by transitions and activated according to input conditions.

```text
State Machine Layer
├── Entry State         (auto-included)
├── Exit State          (auto-included)
├── Any State           (auto-included)
└── [User States]
    ├── Single Animation State
    ├── 1D Blend State
    └── Additive Blend State
```

## Options / Props

| Type | Description |
| --- | --- |
| Entry State | The starting point of a layer; the animation attached here plays first |
| Exit State | Stops the layer; useful when coordinating multiple layers |
| Any State | Connected states can be reached from any current state regardless of normal transition logic |
| Single Animation State | Plays one timeline; can be one-shot, looping, or ping-pong |
| 1D Blend State | Blends two or more timelines using a single Number input; animations ramp additively as the value changes |
| Additive Blend State | Blends multiple timelines using multiple Number inputs; useful for complex outcomes like facial expressions |

### State options (Inspector)

| Option | Description |
| --- | --- |
| Name | The name of the state |
| Caption | Notes for collaborators or your future self; an info icon appears on the state in the graph. Editor-only, not exported for runtime |
| Type | Single animation, 1D blend, or additive blend |
| Timeline | The animation assigned to the state (dropdown) |
| Speed | Playback speed; positive plays forward, negative plays backward |
| Transitions | Lists transitions to and from the state; eye icon disables a transition, **-** removes it |

### Actions and action timing

Actions run when the state starts or ends: set property values, report events, align targets, control focus, fire a scripted action. Each action runs at **Start** (when the state begins) or **End** (after the state completes). Create one by selecting a state, clicking `+` to the right of the state name and selecting an action type, then configuring it. Actions can also fire at the start or end of a transition.

### Blend state details

- Add a Single Animation state by dragging an animation from the Animations List onto the Graph; right-click the graph to create a blank state of any type, then assign a timeline in the Inspector.
- 1D Blend: add the number view model property that drives the blend, add timelines with `+` (as many as you like), then define the numeric range (e.g. 0 to 100). A graph shows how animations mix. It ramps one animation up and the other down as the value changes; the mixing is not linear but additive and could give unexpected results. Best to use timelines with only a few properties keyed (e.g. only X scale for a health bar).
- Additive Blend: mixes timelines using multiple number properties. Adding an animation prompts for **Blend by Value** (baseline / default pose, not tied to a property, describes its mix weighting) or **Blend by Property** (mixed with the default pose via a number property; give each property blend its own number property).

## Notes

- State properties include: animation selection, playback speed (positive = forward, negative = reverse), and transitions.
- Actions can be triggered at the start or end of a state (e.g., set a property, fire an event).
- 1D Blend States are commonly used for things like health bars and loading indicators.
- Additive Blend States support "by value" (baseline, uncontrolled) and "by property" (controlled via Number inputs) blending modes.

## Related

- [State Machine](./state-machine.md)
- [Transitions](./transitions.md)
- [Inputs](./inputs.md)
