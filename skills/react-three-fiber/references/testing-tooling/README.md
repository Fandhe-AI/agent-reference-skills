# testing-tooling

| Name | Description | Path |
|------|-------------|------|
| no-clone-in-loop | Disallow cloning vectors in the frame loop, since cloning instantiates new objects and wastes memory. | [eslint-no-clone-in-loop.md](./eslint-no-clone-in-loop.md) |
| no-new-in-loop | Disallow instantiating new objects in the frame loop, since this wastes memory and GPU resources. | [eslint-no-new-in-loop.md](./eslint-no-new-in-loop.md) |
| @react-three/eslint-plugin (Installation / Configuration / Rules / Shareable configs) | An ESLint plugin which provides lint rules for @react-three/fiber. | [eslint-plugin.md](./eslint-plugin.md) |
| ReactThreeTestInstance | Internal class that wraps the elements returned from `ReactThreeTestRenderer.create`, mirroring the API of `react-test-renderer`. | [test-instance.md](./test-instance.md) |
| act() (@react-three/test-renderer) | Prepares a component for assertions, similar to `act()` in `react-test-renderer`. | [test-renderer-act.md](./test-renderer-act.md) |
| create() / CreateOptions | Creates a ReactThreeTestRenderer instance from a `three` element such as `<mesh />`. | [test-renderer-create.md](./test-renderer-create.md) |
| fireEvent() / MockSyntheticEvent | Fires an event on a part of the rendered tree. | [test-renderer-fire-event.md](./test-renderer-fire-event.md) |
| advanceFrames() / update() / unmount() | Drive frames, re-render and unmount a test renderer. | [test-renderer-lifecycle.md](./test-renderer-lifecycle.md) |
| scene / getInstance() / toTree() / toGraph() | Members of the object returned by `create()` for inspecting the rendered tree. | [test-renderer-scene-graph.md](./test-renderer-scene-graph.md) |
| Testing (How to test React Three Fiber / Testing interactions) | Unit tests for R3F components use React Three Test Renderer (`@react-three/test-renderer`), which is testing-library agnostic. | [testing-overview.md](./testing-overview.md) |
