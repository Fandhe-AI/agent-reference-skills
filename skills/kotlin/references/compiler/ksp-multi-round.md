---
source: https://kotlinlang.org/docs/ksp-multi-round.html
---

# Multiple-round processing

KSP processes files over multiple rounds; the output of each round is used as additional input in the next. Return deferred symbols from `SymbolProcessor.process()` as `List<KSAnnotated>`.

## Signature / Usage

```kotlin
override fun process(resolver: Resolver): List<KSAnnotated> {
    val symbols = resolver.getSymbolsWithAnnotation("com.example.annotation.Builder")
    val result = symbols.filter { !it.validate() }
    symbols
        .filter { it is KSClassDeclaration && it.validate() }
        .map { it.accept(BuilderVisitor(), Unit) }
    return result
}
```

## Notes

- Processing ends when a round generates no new files. If deferred symbols remain unprocessed, KSP logs an error for each processor with remaining deferred symbols.
- Defer only when additional information is required and the symbol originates from source code. Never defer classpath symbols (KSP filters them out automatically).
- Validation: `KSAnnotated.validate()` determines whether to defer. It can be expensive (type resolution); check only what's required. Customize with `KSValidateVisitor` and a `predicate` lambda; use `KSType.isError` (true means KSP could not resolve the type).
- File access: `Resolver.getAllFiles()` returns existing and newly generated files; `Resolver.getNewFiles()` returns only files generated in the previous round. `Resolver.getSymbolsWithAnnotation()` (primary entry point) returns, per round, only symbols from newly generated files and symbols deferred from the previous round.
- A processor instance is created once and can store information across rounds, but symbols and `Resolver` instances must not be reused across rounds (resolution results can change when files are generated).
- Errors: report via `KSPLogger.error()`. KSP calls `SymbolProcessor.onError()` instead of `SymbolProcessor.finish()`, and processing stops after the current round; other processors continue during that round.
- Exceptions (from KSP or from processors) terminate processing immediately and are logged through `KSPLogger`; report KSP exceptions to the KSP issue tracker. `onError()` has a default no-op implementation and is called on all processors at the end of the round in which an error or exception occurs.

## Related

- [ksp-incremental](./ksp-incremental.md)
- [ksp-quickstart](./ksp-quickstart.md)
- [ksp-overview](./ksp-overview.md)
