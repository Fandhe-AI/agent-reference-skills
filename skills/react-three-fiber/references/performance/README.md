# performance

| Name | Description | Path |
|------|-------------|------|
| Enable concurrency | React 18 introduced concurrent scheduling, specifically time slicing via `startTransition` and `useTransition`. | [concurrency.md](./concurrency.md) |
| Instancing | Each mesh is a draw call, so keep the count low and reduce draw calls by instancing repeating objects. | [instancing.md](./instancing.md) |
| Level of detail | Reduce the quality of an object the further it is away from the camera. | [level-of-detail.md](./level-of-detail.md) |
| Movement regression | Sites like Sketchfab keep a scene fluid by regressing movement: effects, textures and shadows slightly reduce quality until still-stand. | [movement-regression.md](./movement-regression.md) |
| Nested loading | Nested loading means that lesser textures and models are loaded first, higher-resolution later. | [nested-loading.md](./nested-loading.md) |
| On-demand rendering (frameloop demand / invalidate) | Opt into on-demand rendering so the canvas renders only when necessary, instead of running a 60 fps game loop. | [on-demand-rendering.md](./on-demand-rendering.md) |
| Performance monitoring | Drei's `PerformanceMonitor` adapts quality to device performance by averaging fps and triggering `onIncline` / `onDecline` callbacks. | [performance-monitoring.md](./performance-monitoring.md) |
| Performance pitfalls: mounting and objects | Avoid re-mounting, since buffers and materials get re-initialized and recompiled, which can be expensive. | [pitfalls-mounting-and-objects.md](./pitfalls-mounting-and-objects.md) |
| Performance pitfalls: state and loops | Creating objects can be expensive in three.js, so share materials and geometries and do fast updates by mutation in `useFrame`. | [pitfalls-state-and-loops.md](./pitfalls-state-and-loops.md) |
| Re-using geometries and materials | Each geometry and material adds overhead for the GPU, so re-use resources when they repeat. | [reusing-geometries-materials.md](./reusing-geometries-materials.md) |
