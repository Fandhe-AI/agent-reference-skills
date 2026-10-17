---
source: https://kotlinlang.org/docs/ksp-incremental.html
---

# Incremental processing

KSP reprocesses a file only when one or more of its dependencies change. Enabled by default.

## Signature / Usage

Disable (troubleshooting, forcing a full rebuild) in `gradle.properties`:

```properties
ksp.incremental=false
```

Declare dependencies when generating output with `Dependencies`:

Adapted (not in the official docs): adds the `List<KSAnnotated>` return type and returns `emptyList()`.

```kotlin
// A.kt
@Interesting
class A : B()

// B.kt
open class B

// Example1Processor.kt
class Example1Processor : SymbolProcessor {
   override fun process(resolver: Resolver): List<KSAnnotated> {
       val declA = resolver.getSymbolsWithAnnotation("Interesting").first() as KSClassDeclaration
       val declB = declA.superTypes.first().resolve().declaration
       // B.kt isn't required, because it can be deduced as a dependency by KSP
       val dependencies = Dependencies(aggregating = true, declA.containingFile!!)
       // outputForA.kt
       val outputName = "outputFor${declA.simpleName.asString()}"
       // outputForA depends on A.kt and B.kt
       val output = codeGenerator.createNewFile(dependencies, "com.example", outputName, "kt")
       output.write("// $declA : $declB\n".toByteArray())
       output.close()
       return emptyList()
   }
   // ...
}
```

Debug logging:

```properties
ksp.incremental.log=true
ksp.incremental.log.graph.origin=<fully-qualified-name>
```

CLI equivalent: `-incremental-log=true -incremental-log.graph.origin=<fully-qualified-name>`.

## Notes

- The official snippet (kotlin-web-site 0b10373) omits the return type; SymbolProcessor.process must return List<KSAnnotated>, so this page adds it and returns emptyList().
- Dirty file: directly modified, or indirectly affected by other dirty files. Processors associate generated outputs with input sources (`CodeGenerator`); KSP uses this to find sources to reprocess.
- Root sources are files whose symbols come directly from `Resolver.getAllFiles()`, `Resolver.getSymbolsWithAnnotation()`, `Resolver.getClassDeclarationByName()`, or `Resolver.getDeclarationsFromPackage()`. Other symbols resolved from a root source are tracked automatically.
- Outputs are classified per output (not per processor): aggregating (can be affected by any source file change except removals that don't impact other files; any input change rebuilds all aggregating outputs, e.g. collecting all symbols with an annotation) and isolating (depend only on specified sources, e.g. a class dedicated to an interface it implements).
- Dirtiness propagates by resolution tracing (type resolution is the only way to traverse between files) and by input-output correspondence (files sharing an output form an equivalence class); the two rules can trigger each other repeatedly.
- Rules: a changed input is always reprocessed; if it is associated with an output, all other inputs of that output are reprocessed (repeatedly until no new dirty file); an unchanged input not associated with any aggregating output isn't reprocessed. Example: when `sourceA` changes, aggregating `outputB` reprocesses both `sourceA` and `sourceB`, isolating `outputB` only `sourceA`; removing a source requires no reprocessing.
- Reporting bugs: enable `ksp.incremental.log=true`, run a clean successful build, copy `build/kspCaches/<source set>/logs/kspDirtySet.log` and `kspSourceToOutputs.log`, modify a source to trigger the issue, rebuild, and attach both sets of logs to a GitHub issue. A Graphviz DOT file of the dependency graph is generated in the `logs` directory.

## Related

- [ksp-multi-round](./ksp-multi-round.md)
- [ksp-overview](./ksp-overview.md)
