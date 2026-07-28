# Modularization

The practice of organizing a codebase into loosely coupled, self-contained modules, each serving a clear purpose, to reduce complexity and improve scalability.

## Notes

- Benefits: reusability (share code / build multiple app variants), strict visibility control (`internal`/`private` hides implementation), customizable delivery (Play Feature Delivery), scalability (limits coupling), clear ownership, encapsulation, isolated testability, and faster incremental/parallel/cached Gradle builds.
- Pitfalls: too fine-grained (build/boilerplate overhead outweighs benefits), too coarse-grained (collapses back into a monolith), and too complex for the codebase's actual size (small projects may not need it).
- Not required for every app — worthwhile mainly for reusability across apps, strict API visibility control, or Play Feature Delivery needs; otherwise weigh benefit against added build/config complexity.

## Related

- [modularization-patterns](./modularization-patterns.md)
- [layers](./layers.md)
