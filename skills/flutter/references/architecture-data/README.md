# architecture-data

| Name | Description | Path |
|------|-------------|------|
| Common architecture concepts | Principles that guide architectural decisions in app development: separation of concerns, layered architecture, single source of truth, unidirectional data flow, testability. | [architecture-concepts.md](./architecture-concepts.md) |
| Guide to app architecture | The recommended way to architect a Flutter app: UI and data layers split into Views, View models, Repositories, and Services (MVVM), with an optional domain layer. | [architecture-guide.md](./architecture-guide.md) |
| Architecture recommendations and resources | Architecture best practices and why they matter; treat them as recommendations, not steadfast rules. | [architecture-recommendations.md](./architecture-recommendations.md) |
| Architecting Flutter apps | Entry page of the Flutter app architecture guide: how to structure and design a Flutter app so it scales as projects and teams grow. | [architecture.md](./architecture.md) |
| Choose a database for your Flutter app | Compare Cloud Firestore, Firebase SQL Connect, on-device SQLite, and key-value storage; Flutter has no built-in database. | [choose-a-database.md](./choose-a-database.md) |
| Architecture design patterns | Index of articles about specific design problems that improve a Flutter code base regardless of the overall architecture. | [design-patterns.md](./design-patterns.md) |
| Differentiate between ephemeral state and app state | Ephemeral (UI/local) state lives in a single widget with `StatefulWidget` and `setState()`; app state is shared across the app. | [ephemeral-vs-app-state.md](./ephemeral-vs-app-state.md) |
| Firebase | Pointer page for using Firebase (a Backend-as-a-Service platform) with Flutter, including Cloud Firestore and Firebase SQL Connect. | [firebase.md](./firebase.md) |
| Google APIs | Use `package:googleapis` from Flutter for APIs that access end-user data via Google authentication (Calendar, Gmail, YouTube, Firebase). | [google-apis.md](./google-apis.md) |
| JSON and serialization | Ways to use JSON in Flutter: manual serialization with `dart:convert`, or code generation with `json_serializable`. | [json-serialization.md](./json-serialization.md) |
| Networking | Internet network calls in Flutter: the `http` package is the simplest cross-platform way to issue HTTP requests. | [networking.md](./networking.md) |
| The command pattern | A command is a class that wraps a view model action and exposes its states (running, completed, error). | [pattern-command.md](./pattern-command.md) |
| Persistent storage architecture: Key-value data | Integrate on-device key-value persistence into an MVVM Flutter app, using a dark mode preference stored via `shared_preferences`. | [pattern-key-value-data.md](./pattern-key-value-data.md) |
| Offline-first support | Implement offline-first reading, writing, and synchronization in a repository that combines a remote API service and a local database service. | [pattern-offline-first.md](./pattern-offline-first.md) |
| Optimistic state | Improve perceived responsiveness by presenting a successful UI state before the background task completes, reverting only if it fails. | [pattern-optimistic-state.md](./pattern-optimistic-state.md) |
| Error handling with Result objects | Wrap function output in a `Result` (`Ok` or `Error`) instead of throwing, so calling components must handle errors. | [pattern-result.md](./pattern-result.md) |
| Persistent storage architecture: SQL | Integrate local SQL persistence into an MVVM Flutter app using `sqflite` (with `sqflite_common_ffi` for desktop), shown with a ToDo list. | [pattern-sql.md](./pattern-sql.md) |
| Simple app state management | App state management with the `provider` package: lift state up, hold it in a `ChangeNotifier`, and read it with `Consumer`. | [simple-app-state.md](./simple-app-state.md) |
| Start thinking declaratively | Flutter is declarative: it builds its UI to reflect the current state of the app, so the UI rebuilds from scratch when state changes. | [state-declarative.md](./state-declarative.md) |
| State management | Introduction to the state management section: how to structure an app to manage the state of data flowing through it. | [state-intro.md](./state-intro.md) |
| Approaches to state management | Overview of built-in approaches and community packages for managing state in Flutter apps, with pointers to learning resources. | [state-management-options.md](./state-management-options.md) |
