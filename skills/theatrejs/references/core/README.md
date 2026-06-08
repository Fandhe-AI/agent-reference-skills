# core

| Name | Description | Path |
| --- | --- | --- |
| getProject | Creates or retrieves a Project by ID | [get-project.md](./get-project.md) |
| Project | Top-level animation container; sheet(), ready, isReady, address | [project.md](./project.md) |
| Sheet | Collection of animatable Objects sharing one Sequence timeline | [sheet.md](./sheet.md) |
| Sequence | Animation timeline; play(), pause(), position, attachAudio() | [sequence.md](./sequence.md) |
| Object | Animatable entity with typed props; value, props, onValuesChange() | [object.md](./object.md) |
| types | Prop type constructors: compound, number, rgba, boolean, string, stringLiteral, image, file | [types.md](./types.md) |
| val | Reads the current value of a pointer (one-time, non-reactive) | [val.md](./val.md) |
| onChange | Subscribes to pointer value changes; returns unsubscribe function | [on-change.md](./on-change.md) |
| @theatre/dataverse | Reactive dataflow primitives: Atom, prism, Ticker | [dataverse.md](./dataverse.md) |
