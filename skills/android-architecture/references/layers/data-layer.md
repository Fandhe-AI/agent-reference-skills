# Data Layer

Contains application data and business logic, organized into repositories (one per data type) each backed by zero or more data sources (network, database, file).

## Signature / Usage

```kotlin
class NewsRepository(
    private val newsRemoteDataSource: NewsRemoteDataSource,
    private val newsLocalDataSource: NewsLocalDataSource,
) {
    // Observable data changes over time
    val newsStream: Flow<List<Article>> = newsLocalDataSource.observeNews()

    // One-shot operation
    suspend fun refreshLatestNews() {
        val news = newsRemoteDataSource.fetchLatestNews()
        newsLocalDataSource.saveNews(news)
    }
}
```

## Notes

- Repository responsibilities: expose data to the rest of the app, centralize data changes (repository pattern), resolve conflicts between multiple data sources, and abstract data sources from the rest of the app.
- Each data source works with exactly one source of data (network, database, file); other layers must go through a repository, never a data source directly.
- Naming: `[DataType]Repository` (e.g. `NewsRepository`); `[DataType][Remote|Local]DataSource` (e.g. `NewsRemoteDataSource`).
- API shape: expose `suspend` functions for one-shot CRUD operations, `Flow<T>` for data that changes over time.
- Three operation lifetimes: UI-oriented (canceled when the screen leaves), app-oriented (canceled when the app/process dies, e.g. in-memory cache), business-oriented (must survive process death — use `WorkManager`).
- Each repository defines a single source of truth; for offline-first apps this should be the local data source. See [offline-first](./offline-first.md).
- Use separate model classes per layer (network model, local/entity model, domain/external model) with explicit mapper functions between them.

## Related

- [layers](./layers.md)
- [domain-layer](./domain-layer.md)
- [offline-first](./offline-first.md)
