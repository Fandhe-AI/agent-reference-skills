# layers

| Name | Description | Path |
|------|-------------|------|
| App Architecture Layers | Recommended UI / domain / data layer split and core principles (SoC, drive UI from data models, SSOT, UDF). | [layers.md](./layers.md) |
| Introduction to App Architecture | Why apps need robust architecture; common tasks a good architecture must support. | [intro.md](./intro.md) |
| UI Layer | Visual representation of app state; UI state, UDF within the UI layer. | [ui-layer.md](./ui-layer.md) |
| UI State Holders | State holder classes (ViewModel vs plain class) that produce and hold UI state. | [ui-state-holders.md](./ui-state-holders.md) |
| UI Events | Handling user/UI events: UI logic vs business logic, event decision tree. | [ui-events.md](./ui-events.md) |
| UI State Production | Pipeline for turning inputs into observable UI state (StateFlow / Compose State). | [ui-state-production.md](./ui-state-production.md) |
| Domain Layer | Optional layer of use case classes encapsulating reusable business logic. | [domain-layer.md](./domain-layer.md) |
| Data Layer | Repository + data source pattern for exposing app data and business logic. | [data-layer.md](./data-layer.md) |
| Offline-First Apps | Local source of truth, write strategies, sync strategies, conflict resolution. | [offline-first.md](./offline-first.md) |
| Architecture Recommendations | Strongly recommended / recommended / optional practices across all layers. | [recommendations.md](./recommendations.md) |
| Models and Naming Conventions | Per-layer model mapping, and naming rules for methods/properties/streams/interface implementations. | [models-and-naming-conventions.md](./models-and-naming-conventions.md) |
| Modularization | Splitting a codebase into loosely coupled modules; benefits and pitfalls. | [modularization.md](./modularization.md) |
| Modularization Patterns | Module types (data/feature/app/common) and dependency-direction conventions. | [modularization-patterns.md](./modularization-patterns.md) |
