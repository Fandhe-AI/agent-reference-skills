# typescript

| Name | Description | Path |
|------|-------------|------|
| Exported types | react-three-fiber is extensible and exports types for its internals, such as render props, canvas props, and events. | [exported-types.md](./exported-types.md) |
| Extend usage / Extending ThreeElements | react-three-fiber can also accept third-party elements and extend them into its internal catalogue. | [extend-types.md](./extend-types.md) |
| Extending three default elements | If you open your own root instead of using `<Canvas>`, you can extend the default elements with `extend`. | [extending-default-elements.md](./extending-default-elements.md) |
| Accessing typed three-elements (ThreeElements) | The `ThreeElements` interface extracts the mesh, group, or any other three element, including custom elements, for typing props. | [three-elements.md](./three-elements.md) |
| Typing with useRef | React's `useRef` won't automatically infer types despite pointing it to a typed ref, so pass the type through its generics. | [typing-with-useref.md](./typing-with-useref.md) |
