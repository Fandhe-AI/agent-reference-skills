---
source: https://docs.flutter.dev/app-architecture/guide
---

# Guide to app architecture

The recommended way to architect a Flutter app: two broad layers (UI layer and data layer) split into Views, View models, Repositories, and Services (MVVM), with an optional domain layer of use-cases.

## Signature / Usage

Components recommended by the guide:

```text
* Views
* View models
* Repositories
* Services
```

Rules for adding use-cases ("data access with use-cases"):

```text
* Use-cases depend on repositories
* Use-cases and repositories have a many-to-many relationship
* View models depend on one or more use-cases *and* one or more repositories
```

## Components

| Component | Layer | Responsibility |
|-----------|-------|----------------|
| View | UI | Describes how to present data: compositions of widgets that make a feature (often a screen with a `Scaffold` and all widgets below it). Passes events to the view model. Contains no business logic. |
| View model | UI | Converts app data into UI state; retrieves and transforms repository data (filter, sort, aggregate); keeps the current state needed by the view; exposes callbacks (**commands**) for event handlers. |
| Repository | Data (model layer) | Source of truth for model data. Polls services and transforms raw data into **domain models**. Handles caching, error handling, retry logic, refreshing data, polling services for new data, refreshing data based on user actions. One repository per type of data. |
| Service | Data (model layer) | Lowest layer. Wraps API endpoints (platform APIs, REST endpoints, local files) and exposes `Future` / `Stream` objects. Holds no state; one service class per data source. |
| Use-case (optional) | Domain | Encapsulates business logic that merges data from multiple repositories, is exceedingly complex, or is reused by different view models. Also called interactors. |

## Notes

- Guidelines, not steadfast rules; adapt them to your requirements.
- MVVM: a feature is split into `Model` (repositories + services), `ViewModel`, and `View`. Every feature contains one view and one view model, one or more repositories, and zero or more services.
- Views and view models have a one-to-one relationship. A view is an abstract term: one view does not equal one widget, so a view model maps one-to-one to a *collection* of widgets. Example: `LoginViewModel` + `LoginView`; `LogoutViewModel` + `LogoutView` (a single button that can be dropped into other widgets).
- The only logic a view should contain: simple if-statements to show/hide widgets based on a flag or nullable field in the view model, animation logic, layout logic based on device information (screen size, orientation), and simple routing logic.
- Commands are named for the command pattern: Dart functions written as members of the view model class, called by gesture handlers in the view.
- Repositories and view models have a many-to-many relationship. Repositories should never be aware of each other; combine data from two repositories in the view model or the domain layer. Example output: a `UserProfileRepository` exposing a `Stream<UserProfile?>` that emits whenever the user signs in or out.
- Repositories are also the ideal place for app-wide session state (active user session, in-memory data caches, transient application settings), typically shared via a service locator or dependency injection container.
- Services and repositories have a many-to-many relationship. Services are most helpful when the data lives outside the app's Dart code.
- Domain layer pros: avoids duplication in view models, improves testability, improves readability. Cons: more classes and cognitive load, additional mocks in tests, more boilerplate. A good approach is to add use-cases only when needed.
- Flutter app architecture (Dart, MVVM) is parallel to but distinct from the android-architecture skill's guidance; "ViewModel", "Repository", "UI layer" and "data layer" share names, but here view models are plain Dart classes (typically `ChangeNotifier`).

## Related

- [Common architecture concepts](./architecture-concepts.md)
- [Architecture recommendations and resources](./architecture-recommendations.md)
- [The command pattern](./pattern-command.md)
- [State management](./state-intro.md)
