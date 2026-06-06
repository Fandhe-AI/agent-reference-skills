# Input Processors

| Name | Description | Path |
|------|-------------|------|
| Behaviors Input Processor | Triggers standard ZMK behaviors when specific input event codes are received, primarily used to map physical mouse buttons to key behaviors. | [behaviors.md](./behaviors.md) |
| Code Mapper Input Processor | Remaps input event codes to different codes, for example converting vertical Y movement events into scroll wheel events. | [code-mapper.md](./code-mapper.md) |
| Input Processors Overview | Input processors are functional components that process and optionally modify events generated from emulated and physical pointing devices. | [overview.md](./overview.md) |
| Input Processor Usage | Describes how to attach input processors to input listeners and configure layer-specific overrides. | [usage.md](./usage.md) |
| Scaler Input Processor | Scales input event values by multiplying then dividing, used to increase or decrease pointer sensitivity on specified axes. | [scaler.md](./scaler.md) |
| Temp Layer Input Processor | Activates a specified keymap layer when pointing device events are received and automatically deactivates it after a configurable idle timeout. | [temp-layer.md](./temp-layer.md) |
| Transformer Input Processor | Applies transforms (invert, swap) to the values of input events matching specified axis codes. | [transformer.md](./transformer.md) |
