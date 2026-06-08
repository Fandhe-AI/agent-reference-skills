# concepts

| Name | Description | Path |
| --- | --- | --- |
| Overview | What Theatre.js is, Studio-vs-runtime split, and the core development pattern | [overview.md](./overview.md) |
| Getting Started | Minimal CDN-based setup: Project → Sheet → Object → onValuesChange → production playback | [getting-started.md](./getting-started.md) |
| Project | Top-level container that owns all sheets and the persisted animation state | [project.md](./project.md) |
| Sheet | Container grouping Sheet Objects onto a shared Sequence timeline; supports independent instances | [sheet.md](./sheet.md) |
| Sheet Object | Animated entity with typed props; values are driven by the Sequence and applied via onValuesChange | [sheet-object.md](./sheet-object.md) |
| Sequence | The timeline attached to a Sheet; controls keyframes, playback, looping, and audio sync | [sequence.md](./sequence.md) |
| Prop Types | Typed property descriptors (number, compound, boolean, string, rgba, image) for Sheet Objects | [prop-types.md](./prop-types.md) |
| Studio | Visual editor for authoring animations at dev time; zero production footprint | [studio.md](./studio.md) |
| State | JSON serialisation of all keyframes and tweaks; the bridge between Studio authoring and production | [state.md](./state.md) |
