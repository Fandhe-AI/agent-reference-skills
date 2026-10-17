# functions

| Name | Description | Path |
|------|-------------|------|
| Context parameters | Context parameters let functions and properties declare dependencies that are implicitly available in the surrounding context, so shared values (services, dependencies) need not be passed manually. | [context-parameters.md](./context-parameters.md) |
| Functions | Declare functions with the `fun` keyword, parameters in parentheses, and an optional return type. | [functions.md](./functions.md) |
| Inline functions | The `inline` modifier inlines a function and the lambdas passed to it at the call site, removing the closure and function-object overhead of higher-order functions. | [inline-functions.md](./inline-functions.md) |
| Higher-order functions and lambdas | Kotlin functions are first-class: they can be stored in variables, passed to and returned from higher-order functions. | [lambdas.md](./lambdas.md) |
| Operator overloading | Provide custom implementations for the predefined set of operators by declaring a member or extension function with a specific name and the `operator` modifier. | [operator-overloading.md](./operator-overloading.md) |
| Type-safe builders | Well-named functions combined with function literals with receiver create statically typed builders, enabling Kotlin DSLs for hierarchical data (HTML/XML markup, web server routes). | [type-safe-builders.md](./type-safe-builders.md) |
| Unused return value checker | Compiler check that detects ignored results: values of expressions other than `Unit`, `Nothing`, `Nothing?` that are silently dropped. | [unused-return-value-checker.md](./unused-return-value-checker.md) |
| Using builders with builder type inference | Builder inference lets the compiler infer type arguments of a generic builder call (such as `buildMap()` / `buildList()`) from the calls inside its lambda argument. | [using-builders-with-builder-inference.md](./using-builders-with-builder-inference.md) |
