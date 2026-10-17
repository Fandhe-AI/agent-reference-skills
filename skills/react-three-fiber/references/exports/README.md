# exports

| Name | Description | Path |
|------|-------------|------|
| act | `act` for usage with react-testing. In v9 it is a deprecated alias of React's own `act`. | [act.md](./act.md) |
| addEffect / addAfterEffect / addTail / flushGlobalEffects | Global render-loop callbacks: `addEffect` runs each frame before roots render, and `addAfterEffect` runs each frame after. | [add-effect.md](./add-effect.md) |
| advance | Advances the frameloop (given that it's set to `'never'`). | [advance.md](./advance.md) |
| applyProps | `applyProps(element, props)` sets element properties. | [apply-props.md](./apply-props.md) |
| buildGraph | Collects nodes and materials from a `THREE.Object3D`. | [build-graph.md](./build-graph.md) |
| createPortal | Creates a portal (a React feature for re-parenting) that renders children into a given `THREE.Object3D` container with its own scene, raycaster and pointer. | [create-portal.md](./create-portal.md) |
| events (createPointerEvents) / createEvents | `events` is the DOM pointer-event system, the `createPointerEvents` factory re-exported under the name `events`. | [events.md](./events.md) |
| extend | Extends the native-object catalogue so three.js classes (or third-party classes) can be used as JSX elements. | [extend.md](./extend.md) |
| flushSync | Force React to flush any updates synchronously and immediately. | [flush-sync.md](./flush-sync.md) |
| invalidate | Forces view global invalidation: requests a frame to be rendered. | [invalidate.md](./invalidate.md) |
| Other exports (getRootState / dispose / context / reconciler / unmountComponentAtNode) | Public exports listed in `packages/fiber/src/core/index.tsx` that are not in the docs' Additional Exports table. | [other-exports.md](./other-exports.md) |
