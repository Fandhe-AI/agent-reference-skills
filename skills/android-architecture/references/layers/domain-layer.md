# Domain Layer

An optional layer between the UI layer and the data layer that encapsulates complex business logic, or simple business logic reused by multiple ViewModels, via use case (interactor) classes.

## Signature / Usage

```kotlin
class GetLatestNewsWithAuthorsUseCase(
    private val newsRepository: NewsRepository,
    private val authorsRepository: AuthorsRepository,
    private val defaultDispatcher: CoroutineDispatcher = Dispatchers.Default,
) {
    suspend operator fun invoke(): List<ArticleWithAuthor> = withContext(defaultDispatcher) {
        val news = newsRepository.fetchLatestNews()
        news.map { article -> ArticleWithAuthor(article, authorsRepository.getAuthor(article.authorId)) }
    }
}

class MyViewModel(private val getLatestNews: GetLatestNewsWithAuthorsUseCase) : ViewModel()
```

## Notes

- Naming convention: verb (present tense) + optional noun + `UseCase`, e.g. `FormatDateUseCase`, `LogOutUserUseCase`.
- Use only when needed — to avoid code duplication across ViewModels or to reduce a ViewModel's complexity; it is not required for every app.
- Each use case has a single responsibility, holds no mutable data, and is called via `operator fun invoke()` so it reads like a function call.
- Use cases must be main-safe; move blocking work to a background dispatcher with `withContext()` internally.
- Use cases depend on repositories (data layer) and/or other use cases; they have no lifecycle of their own and are scoped to their caller.
- Two access strategies: restrict all data-layer access through use cases (prevents bypassing domain logic) or allow the UI to call repositories directly for simple cases and add use cases only where needed.

## Related

- [layers](./layers.md)
- [data-layer](./data-layer.md)
