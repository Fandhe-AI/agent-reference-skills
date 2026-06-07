# concepts

| Name | Description | Path |
| --- | --- | --- |
| State Machine | Visual framework for connecting animations and defining interactive transition logic | [state-machine.md](./state-machine.md) |
| States | Nodes in the State Machine graph: Entry, Exit, Any, Single Animation, 1D Blend, and Additive Blend | [states.md](./states.md) |
| Transitions | Directed connections between states; define conditions and timing for state changes | [transitions.md](./transitions.md) |
| Layers | Independent parallel animation tracks within a State Machine; enable concurrent animation blending | [layers.md](./layers.md) |
| Inputs | Named Boolean, Number, or Trigger values that drive State Machine transition conditions | [inputs.md](./inputs.md) |
| Listeners | Pointer/event handlers that update data or fire events without runtime code | [listeners.md](./listeners.md) |
| Data Binding | System that connects ViewModel properties to scene elements; drives automatic scene updates | [data-binding.md](./data-binding.md) |
| ViewModels | Reusable data blueprints defining property structure; ViewModel Instances hold actual values | [view-models.md](./view-models.md) |
| Instances | ViewModel Instances — concrete data containers created from a ViewModel blueprint | [instances.md](./instances.md) |
| Properties | Individual typed data fields within a ViewModel (Number, String, Boolean, Color, Enum, List) | [properties.md](./properties.md) |
| Converters | Transformation nodes that modify property values before they are applied to binding targets | [converters.md](./converters.md) |
| Enums | Fixed-set data types restricting a property to a predefined set of named options | [enums.md](./enums.md) |
| Events | Signals emitted from artboards; includes lifecycle callbacks (onPlay, onPause, onLoop, onStop, onStateChange) and custom events | [events.md](./events.md) |
| Layout | Controls how an artboard is scaled (Fit) and positioned (Alignment) within its host container | [layout.md](./layout.md) |
