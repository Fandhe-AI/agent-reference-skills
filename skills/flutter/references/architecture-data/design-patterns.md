---
source: https://docs.flutter.dev/app-architecture/design-patterns
---

# Architecture design patterns

Index of articles about specific design problems that improve a Flutter code base regardless of the overall architecture. The code examples assume the MVVM pattern from the architecture guide.

## Signature / Usage

The list is rendered by the site component:

```text
<ExpansionList list="design-patterns" baseId="design-patterns">
```

## Options / Props

Patterns covered (the page body itself holds only the intro and the component above; titles and descriptions come from each article's frontmatter).

| Pattern | Description | Page |
|---------|-------------|------|
| Optimistic state | Improve the perception of responsiveness of an application by implementing optimistic state. | [pattern-optimistic-state.md](./pattern-optimistic-state.md) |
| Persistent storage architecture: Key-value data | Save application data to a user's on-device key-value store. | [pattern-key-value-data.md](./pattern-key-value-data.md) |
| Persistent storage architecture: SQL | Save complex application data to a user's device with SQL. | [pattern-sql.md](./pattern-sql.md) |
| Offline-first support | Implement offline-first support for one feature in an application. | [pattern-offline-first.md](./pattern-offline-first.md) |
| The command pattern | Simplify view model logic by implementing a Command class. | [pattern-command.md](./pattern-command.md) |
| Error handling with Result objects | Improve error handling across classes with Result objects. | [pattern-result.md](./pattern-result.md) |

## Notes

- "If you've already read through the architecture guide page, or if you're comfortable with Flutter and the MVVM pattern, the following articles are for you."
- Flutter design patterns (Dart, MVVM) are parallel to but distinct from the android-architecture skill's guidance.

## Related

- [Guide to app architecture](./architecture-guide.md)
- [Architecture recommendations and resources](./architecture-recommendations.md)
