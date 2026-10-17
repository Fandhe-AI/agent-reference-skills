---
source: https://docs.flutter.dev/app-architecture
---

# Architecting Flutter apps

Entry page of the Flutter app architecture guide: how to structure, organize, and design a Flutter app so it scales as project requirements and team grow.

## Signature / Usage

Topics the guide covers ("What you'll learn"):

```text
* Benefits of intentional architecture
* Common architectural principles
* The Flutter team's recommended app architecture
* MVVM and state management
* Dependency injection
* Common design patterns for writing robust Flutter applications
```

## Notes

- Benefits of intentional architecture: Maintainability, Scalability, Testability, Lower cognitive load, A better user experience.
- The guide is written for teams with multiple developers contributing to the same code base who are building a feature-rich application ("a *growing team and codebase*"). Some libraries can be swapped out, and very large teams with unique complexity might find that some parts don't apply.
- Structure: first part covers common architectural principles at a high level; second part gives concrete recommendations; the end lists design patterns with sample code.
- Flutter app architecture guide (Dart, MVVM) is parallel to but distinct from the android-architecture skill's guidance; "UI layer", "data layer", "ViewModel" and "Repository" are shared terms, but here a view model is a Dart class (typically a `ChangeNotifier`), not an Android Jetpack `ViewModel`.

## Related

- [Common architecture concepts](./architecture-concepts.md)
- [Guide to app architecture](./architecture-guide.md)
- [Architecture recommendations and resources](./architecture-recommendations.md)
- [Architecture design patterns](./design-patterns.md)
