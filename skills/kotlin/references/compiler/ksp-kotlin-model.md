---
source: https://kotlinlang.org/docs/ksp-kotlin-model.html
---

# How KSP models Kotlin code

KSP represents source code as a hierarchy of symbols that processors navigate to inspect declarations, types, annotations, and other elements.

## Signature / Usage

Symbol hierarchy of an annotated top-level `main()`:

```
KSFile: packageName = "" (root package)
└── declarations
└── KSFunctionDeclaration: main
├── simpleName = "main"
├── qualifiedName = "main"
├── parentDeclaration = null
├── functionKind = TOP_LEVEL
├── annotations
│   └── KSAnnotation: @HelloWorldAnnotation
│       ├── shortName = "HelloWorldAnnotation"
│       └── annotationType: KSTypeReference
│           └── resolve().declaration.qualifiedName
│               → com.example.annotations.HelloWorldAnnotation
├── parameters = []
├── typeParameters = []
├── extensionReceiver = null
└── returnType: KSTypeReference
└── resolve() → kotlin.Unit, NOT_NULL
```

Type references and resolution:

```kotlin
interface KSFunctionDeclaration : ... {
    val returnType: KSTypeReference?
    // ...
}

interface KSTypeReference : KSAnnotated, KSModifierListOwner {
    val element: KSReferenceElement?
    fun resolve(): KSType
}
```

```kotlin
val ksTypeReference = functionDeclaration.returnType ?: return
val ksType: KSType = ksTypeReference.resolve()
val ksDeclaration: KSDeclaration = ksType.declaration
```

Inspecting types with and without resolution:

```kotlin
class TypeInventoryProcessor(
private val logger: KSPLogger,
private val resolveTypes: Boolean,
) : SymbolProcessor {

    override fun process(resolver: Resolver): List<KSAnnotated> {
        val deferred = mutableListOf<KSAnnotated>()

        // This example inspects only top-level properties.
        val properties = resolver.getAllFiles()
            .flatMap { it.declarations }
            .filterIsInstance<KSPropertyDeclaration>()

        for (property in properties) {
            val name = property.simpleName.asString()
            val reference = property.type

            if (!resolveTypes) {
                // Inspect the reference without explicitly resolving it.
                val element =
                    reference.element as? KSClassifierReference ?: continue

                logger.info(
                    "$name: writtenName=${element.referencedName()}, " +
                        "arguments=${element.typeArguments.size}",
                    property,
                )
            } else {
                // Resolve once, then reuse the resulting type.
                val type = reference.resolve()

                if (type.isError) {
                    deferred += property
                    continue
                }

                logger.info(
                    "$name: declaration=" +
                        "${type.declaration.qualifiedName?.asString()}, " +
                        "nullability=${type.nullability}",
                    property,
                )
            }
        }
        return deferred
    }
}
```

## Notes

- `KSTypeReference` is an unresolved type that preserves the syntactic form in the source; its `KSReferenceElement` can be a `KSClassifierReference` (e.g. `referencedName`) or a `KSCallableReference` (`receiverType`, `functionParameters`, `returnType`), inspectable without resolving.
- If generated code references the same types as the source, use the names from `KSTypeReference` instead of resolving; the Kotlin compiler resolves and type-checks them later.
- Type resolution (`KSTypeReference.resolve()`) is one of the most expensive KSP operations, so KSP doesn't resolve implicitly. Inspect the `KSReferenceElement` first (e.g. `KSClassifierReference.referencedName()`) to filter irrelevant references.
- Without resolution an imported alias `SqlDate` appears as written (`birthday: writtenName=SqlDate, arguments=0`); with resolution you get semantic information (`birthday: declaration=java.sql.Date, nullability=NULLABLE`, `names: declaration=kotlin.collections.List, nullability=NOT_NULL`).
- Resolving a function type produces a type from the `Function0`, `Function1`, ... families and is usually unnecessary.
- For the complete API definition, see the KSP API source (`google/ksp`, `api/src/main/kotlin/com/google/devtools/ksp/symbol/`).

## Related

- [ksp-reference](./ksp-reference.md)
- [ksp-quickstart](./ksp-quickstart.md)
- [ksp-multi-round](./ksp-multi-round.md)
