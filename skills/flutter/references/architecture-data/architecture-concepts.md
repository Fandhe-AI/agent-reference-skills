---
source: https://docs.flutter.dev/app-architecture/concepts
---

# Common architecture concepts

Principles that guide architectural decisions in app development and how they fit Flutter: separation of concerns, layered architecture, single source of truth, unidirectional data flow, UI as a function of immutable state, extensibility, testability.

## Signature / Usage

The update loop in unidirectional data flow (UDF), from user interaction to re-rendering the UI:

```text
1. [UI layer] An event occurs due to user interaction, such as a button being clicked. The widget's event handler callback invokes a method exposed by a class in the logic layer.
2. [Logic layer] The logic class calls methods exposed by a repository that know how to mutate the data.
3. [Data layer] The repository updates data (if necessary) and then provides the new data to the logic class.
4. [Logic layer] The logic class saves its new state, which it sends to the UI.
5. [UI layer] The UI displays the new state of the view model.
```

## Notes

- **Separation of concerns**: separate UI logic from business logic (layered architecture); within each layer separate by feature or functionality. In the UI layer write reusable, lean widgets that hold as little logic as possible.
- **Layered architecture**: typically 2 to 3 layers.
  - UI layer ("presentation layer"): displays data exposed by the business logic layer and handles user interaction.
  - Logic layer ("domain layer"): implements core business logic and mediates between data and UI layers. Optional; only needed for complex client-side business logic (many CRUD apps don't need it).
  - Data layer: manages interactions with data sources such as databases or platform plugins and exposes data and methods to the logic layer.
  - Each layer can only communicate with the layers directly below or above it. The UI layer shouldn't know that the data layer exists, and vice versa.
- **Single source of truth (SSOT)**: every data type should have one. If data can be modified in the app, the SSOT class should be the only class that can do so. Generally held in a **Repository** in the data layer, typically one repository per type of data. Applies within classes too (getters derived from an SSOT field; records instead of parallel lists).
- **Unidirectional data flow**: state flows from the data layer through the logic layer to widgets; events flow the opposite direction. New data can also start at the data layer (e.g. a repository polling an HTTP server). Data changes always happen in the SSOT, which is the data layer.
- **UI is a function of (immutable) state**: Flutter is declarative; when state changes, the UI that depends on it rebuilds. Data should be immutable and persistent, and views should contain as little logic as possible.
- **Extensibility**: each piece should have a well-defined list of inputs and outputs. A view model should only take data sources such as repositories as inputs and only expose commands and data formatted for views. Clean interfaces allow swapping concrete implementations.
- **Testability**: a view model can be tested by mocking a repository, independent of Flutter widgets; adding a new view model cannot break logic in the data or business logic layers.
- Flutter app architecture (Dart, MVVM) is parallel to but distinct from the android-architecture skill's guidance; the layer and Repository terms overlap, the APIs and classes are different.

## Related

- [Architecting Flutter apps](./architecture.md)
- [Guide to app architecture](./architecture-guide.md)
- [Start thinking declaratively](./state-declarative.md)
