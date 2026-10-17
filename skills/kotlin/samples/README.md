# samples

| Name | Description | Path |
|------|-------------|------|
| Collections: List, Set, and Map | Create read-only and mutable lists, sets, and maps, and access, add, and remove items. | [collections-list-set-map.md](./collections-list-set-map.md) |
| Control Flow: if and when as Expressions | Use `if` and `when` as expressions that return a value. | [control-flow-when.md](./control-flow-when.md) |
| Coroutines: Cancellation | Cancel a coroutine through its `Job` and propagate cancellation to its children. | [coroutines-cancellation.md](./coroutines-cancellation.md) |
| Coroutines: Structured Concurrency with launch and async | Run child coroutines inside a scope; the scope waits for all of them, and `async` returns a `Deferred` result. | [coroutines-structured-concurrency.md](./coroutines-structured-concurrency.md) |
| Enum Classes | Represent a finite set of values, with properties and member functions, and branch on them with `when`. | [enum-classes.md](./enum-classes.md) |
| Extension Functions | Add a function to an existing class without modifying its source. | [extension-functions.md](./extension-functions.md) |
| Flow: Collect and Cancel | Build a cold flow, collect it, change its upstream context with `flowOn`, and cancel collection through the collecting coroutine's `Job`. | [flow-collect-and-cancel.md](./flow-collect-and-cancel.md) |
| Flow: Error Handling with catch and retry | Handle upstream exceptions with `.catch()` and restart a failing upstream with `.retry()`. | [flow-error-handling.md](./flow-error-handling.md) |
| Functions: Named and Default Arguments | Declare functions with default parameter values, call them with named arguments, and shorten them to single-expression form. | [functions-named-default-arguments.md](./functions-named-default-arguments.md) |
| Gradle JVM Project Build Script | Minimal `build.gradle.kts` for a Kotlin/JVM console application with `kotlin.test`. | [gradle-jvm-project.md](./gradle-jvm-project.md) |
| Idioms: Null Handling and Expressions | Frequently used idioms for fallbacks, `try` / `when` / `if` as expressions, and resource handling. | [idioms-null-handling-expressions.md](./idioms-null-handling-expressions.md) |
| Test Java Code with Kotlin and JUnit (Gradle) | Configure Gradle for JUnit and `kotlin.test`, then write a Kotlin JUnit 5 test class. | [junit-kotlin-tests-gradle.md](./junit-kotlin-tests-gradle.md) |
| Lambda Expressions with Receiver (DSL) | Build a small DSL by passing a lambda with receiver to a builder function. | [lambdas-with-receiver-dsl.md](./lambdas-with-receiver-dsl.md) |
| Kotlin Tests with Maven: Surefire and Failsafe | Add `kotlin-test-junit5`, write unit (`*Test`) and integration (`*IT`) tests, and run them with Surefire and Failsafe. | [maven-kotlin-test-surefire-failsafe.md](./maven-kotlin-test-surefire-failsafe.md) |
| Null Safety Patterns | Declare nullable types and handle them with safe calls, the Elvis operator, and safe casts. | [null-safety-patterns.md](./null-safety-patterns.md) |
| Object Declarations, Data Objects, and Companion Objects | Declare singletons with `object`, print-friendly singletons with `data object`, and class-level members with `companion object`. | [object-declarations-companion.md](./object-declarations-companion.md) |
| Open Classes and Inheritance | Make a class inheritable with `open`, override members, and mix a parent class with interfaces. | [open-classes-inheritance.md](./open-classes-inheritance.md) |
| Scope Functions: let, apply, run, also, with | Choose the scope function that fits the task: null-check, initialize, compute, log, or call many members. | [scope-functions.md](./scope-functions.md) |
| Sealed Classes with when | Model a closed set of subtypes with a sealed class and handle every case in a `when` expression. | [sealed-class-when.md](./sealed-class-when.md) |
| Serialization: JSON Round Trip | Add the serialization plugin and JSON library, then encode an object to JSON and decode it back. | [serialization-json-roundtrip.md](./serialization-json-roundtrip.md) |
| Serialization: JSON with JVM Streams | Write and read JSON directly through JVM `OutputStream` / `InputStream` without intermediate strings. | [serialization-json-streams.md](./serialization-json-streams.md) |
| Serialization: Polymorphism | Serialize a sealed hierarchy with a stable `@SerialName`, and register subclasses of an open base class in a `SerializersModule`. | [serialization-polymorphism.md](./serialization-polymorphism.md) |
