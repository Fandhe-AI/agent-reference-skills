# Models and Naming Conventions

Guidance from the official Architecture Recommendations page on when to create per-layer models, and naming conventions for methods, properties, data streams, and interface implementations.

## Signature / Usage

```kotlin
// method: verb phrase
fun makePayment() { /* ... */ }

// property: noun phrase
val inProgressTopicSelection: List<Topic>

// data stream: get{Model}Stream / get{Models}Stream
fun getAuthorStream(): Flow<Author>
fun getAuthorsStream(): Flow<List<Author>>

// interface implementation: meaningful name, not Default*
class OfflineFirstNewsRepository : NewsRepository
class FakeAuthorsRepository : AuthorsRepository
```

## Notes

- **Models (recommended)**: in complex apps, create a new model per layer/component when it makes sense — a remote data source can map the network model to a simpler class with only the data the app needs; repositories can map DAO models to simpler data classes with just the information the UI layer needs; a `ViewModel` can include data layer models inside its `UiState` classes.
- **Naming methods (optional)**: use verb phrases, e.g. `makePayment()`.
- **Naming properties (optional)**: use noun phrases, e.g. `inProgressTopicSelection`.
- **Naming streams of data (optional)**: when a class exposes a `Flow` (or other stream), use `get{Model}Stream` — e.g. `getAuthorStream(): Flow<Author>`. For a list of models, pluralize the model name — e.g. `getAuthorsStream(): Flow<List<Author>>`.
- **Naming interface implementations (optional)**: use a meaningful name describing the implementation; prefix with `Default` only if no better name exists. For a `NewsRepository` interface, prefer `OfflineFirstNewsRepository` or `InMemoryNewsRepository` over `DefaultNewsRepository`. Prefix fake implementations with `Fake`, e.g. `FakeAuthorsRepository`.

## Related

- [recommendations](./recommendations.md)
- [data-layer](./data-layer.md)
