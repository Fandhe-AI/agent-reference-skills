# WorkQuery

Specification for combined multi-criteria querying of `WorkRequest`s by ids, unique names, tags, and states in a single call, used with `WorkManager.getWorkInfos()` / `getWorkInfosLiveData()` / `getWorkInfosFlow()`.

## Signature / Usage

```kotlin
public class WorkQuery internal constructor(
    public val ids: List<UUID> = emptyList(),
    public val uniqueWorkNames: List<String> = emptyList(),
    public val tags: List<String> = emptyList(),
    public val states: List<WorkInfo.State> = emptyList(),
) {
    public class Builder {
        public fun addIds(ids: List<UUID>): Builder
        public fun addUniqueWorkNames(uniqueWorkNames: List<String>): Builder
        public fun addTags(tags: List<String>): Builder
        public fun addStates(states: List<WorkInfo.State>): Builder
        public fun build(): WorkQuery

        public companion object {
            public fun fromIds(ids: List<UUID>): Builder
            public fun fromUniqueWorkNames(uniqueWorkNames: List<String>): Builder
            public fun fromTags(tags: List<String>): Builder
            public fun fromStates(states: List<WorkInfo.State>): Builder
        }
    }
}
```

```kotlin
val query = WorkQuery.Builder
    .fromTags(listOf("sync"))
    .addStates(listOf(WorkInfo.State.ENQUEUED, WorkInfo.State.RUNNING))
    .build()

workManager.getWorkInfosFlow(query).collect { workInfos ->
    // requests tagged "sync" that are enqueued or running
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ids` | `List<UUID>` | `emptyList()` | Match by `WorkRequest` id. |
| `uniqueWorkNames` | `List<String>` | `emptyList()` | Match by the unique name passed to `enqueueUniqueWork` / `enqueueUniquePeriodicWork`. |
| `tags` | `List<String>` | `emptyList()` | Match by `WorkRequest` tag. |
| `states` | `List<WorkInfo.State>` | `emptyList()` | Match by `WorkInfo.State`. |
| `Builder.addIds/addUniqueWorkNames/addTags/addStates(...)` | `(List<T>) -> Builder` | — | Adds values to the corresponding component; can be called multiple times to accumulate. |
| `Builder.fromIds/fromUniqueWorkNames/fromTags/fromStates(...)` | static | — | Convenience factories that start a `Builder` pre-populated with one component. |
| `build()` | `() -> WorkQuery` | — | Throws `IllegalArgumentException` if all four components are empty. |

## Notes

- Each component (ids/uniqueWorkNames/tags/states) is AND-ed with the others; values within the same component are OR-ed — e.g. `(tag1 OR tag2) AND (state1 OR state2)`.
- Use with `WorkManager.getWorkInfos(workQuery)` (`ListenableFuture`), `getWorkInfosLiveData(workQuery)`, or `getWorkInfosFlow(workQuery)` — the single-axis methods (`getWorkInfoByIdFlow`, `getWorkInfosByTagFlow`, `getWorkInfosForUniqueWorkFlow`) only filter on one component at a time.
- Package: `androidx.work`.

## Related

- [WorkManager enqueue / cancel / query](./workmanager.md)
- [WorkInfo and monitoring](./workinfo.md)
