---
source: https://kotlinlang.org/docs/ksp-reference.html
---

# Java annotation processing to KSP reference

Mapping of Java annotation processing API elements (`javax.lang.model`) to the closest KSP facilities.

## Signature / Usage

```kotlin
// TypeElement.getInterfaces: should be able to do without resolution
ksClassDeclaration.superTypes
    .map { it.resolve() }
    .filter { (it?.declaration as? KSClassDeclaration)?.classKind == ClassKind.INTERFACE }

// TypeElement.getSuperclass
ksClassDeclaration.superTypes
    .map { it.resolve() }
    .filter { (it?.declaration as? KSClassDeclaration)?.classKind == ClassKind.CLASS }

// Elements.isDeprecated
KsDeclaration.annotations.any {
    it.annotationType.resolve()!!.declaration.qualifiedName!!.asString() == Deprecated::class.qualifiedName
}
```

## Options / Props

Program elements:

| Java | Closest facility in KSP | Notes |
| --- | --- | --- |
| `AnnotationMirror` | `KSAnnotation` | |
| `AnnotationValue` | `KSValueArgument` | |
| `Element` | `KSDeclaration` / `KSDeclarationContainer` | |
| `ExecutableElement` | `KSFunctionDeclaration` | |
| `PackageElement` | `KSFile` | KSP doesn't model packages as program elements |
| `Parameterizable` | `KSDeclaration` | |
| `QualifiedNameable` | `KSDeclaration` | |
| `TypeElement` | `KSClassDeclaration` | |
| `TypeParameterElement` | `KSTypeParameter` | |
| `VariableElement` | `KSValueParameter` / `KSPropertyDeclaration` | |

Types (KSP requires explicit type resolution, so some Java functionality can only be carried out by `KSType` and corresponding elements before resolution):

| Java | Closest facility in KSP | Notes |
| --- | --- | --- |
| `ArrayType` | `KSBuiltIns.arrayType` | |
| `DeclaredType` | `KSType` / `KSClassifierReference` | |
| `ErrorType` | `KSType.isError` | |
| `ExecutableType` | `KSType` / `KSCallableReference` | |
| `IntersectionType` | `KSType` / `KSTypeParameter` | |
| `NoType` | `KSType.isError` | N/A in KSP |
| `NullType` | | N/A in KSP |
| `PrimitiveType` | `KSBuiltIns` | Not exactly same as primitive type in Java |
| `ReferenceType` | `KSTypeReference` | |
| `TypeMirror` | `KSType` | |
| `TypeVariable` | `KSTypeParameter` | |
| `UnionType` | N/A | Kotlin has only one type per catch block. `UnionType` is also not observable by even Java annotation processors |
| `WildcardType` | `KSType` / `KSTypeArgument` | |

Misc:

| Java | Closest facility in KSP | Notes |
| --- | --- | --- |
| `Name` | `KSName` | |
| `ElementKind` | `ClassKind` / `FunctionKind` | |
| `Modifier` | `Modifier` | |
| `NestingKind` | `ClassKind` / `FunctionKind` | |
| `ElementVisitor` | `KSVisitor` | |
| `AnnotatedConstruct` | `KSAnnotated` | |
| `TypeKind` | `KSBuiltIns` | Some can be found in builtins, otherwise check `KSClassDeclaration` for `DeclaredType` |
| `ElementFilter` | `Collection.filterIsInstance` | |
| `ElementKindVisitor` | `KSVisitor` | |
| `ElementScanner` | `KSTopDownVisitor` | |
| `SimpleAnnotationValueVisitor` | | Not needed in KSP |
| `SimpleElementVisitor` | `KSVisitor` | |
| `Types` | `Resolver` / `utils` | Some of the `utils` are also integrated into symbol interfaces |
| `Elements` | `Resolver` / `utils` | |

Details (Java member to KSP equivalent):

| Java | KSP equivalent |
| --- | --- |
| `AnnotationMirror.getAnnotationType` / `getElementValues` | `ksAnnotation.annotationType` / `ksAnnotation.arguments` |
| `AnnotationValue.getValue` | `ksValueArgument.value` |
| `Element.asType` | `ksClassDeclaration.asType(...)` for `KSClassDeclaration` only; type arguments need to be supplied |
| `Element.getAnnotation` | To be implemented |
| `Element.getAnnotationMirrors` | `ksDeclaration.annotations` |
| `Element.getEnclosedElements` | `ksDeclarationContainer.declarations` |
| `Element.getEnclosingElements` | `ksDeclaration.parentDeclaration` |
| `Element.getKind` | Type check and cast following `ClassKind` or `FunctionKind` |
| `Element.getModifiers` / `getSimpleName` | `ksDeclaration.modifiers` / `ksDeclaration.simpleName` |
| `ExecutableElement.getDefaultValue` | To be implemented |
| `ExecutableElement.getParameters` | `ksFunctionDeclaration.parameters` |
| `ExecutableElement.getReceiverType` | `ksFunctionDeclaration.extensionReceiver` (Kotlin extension receiver; null if none). Java instance methods: containing `KSClassDeclaration` = `ksFunctionDeclaration.parentDeclaration as? KSClassDeclaration`; null for top-level / static |
| `ExecutableElement.getReturnType` | `ksFunctionDeclaration.returnType` |
| `ExecutableElement.getThrownTypes` | Not needed in Kotlin |
| `ExecutableElement.getTypeParameters` | `ksFunctionDeclaration.typeParameters` |
| `ExecutableElement.isDefault` | `Modifier.JAVA_DEFAULT in ksFunctionDeclaration.modifiers` (Java sources); for Kotlin interfaces, a source-level approximation: `!ksFunctionDeclaration.isAbstract && Modifier.PRIVATE !in ksFunctionDeclaration.modifiers && (ksFunctionDeclaration.parentDeclaration as? KSClassDeclaration)?.classKind == ClassKind.INTERFACE` |
| `ExecutableElement.isVarArgs` | `ksFunctionDeclaration.parameters.any { it.isVararg }` |
| `QualifiedNameable.getQualifiedName` | `ksDeclaration.qualifiedName` |
| `TypeElement.getEnclosedElements` / `getEnclosingElement` | `ksClassDeclaration.declarations` / `ksClassDeclaration.parentDeclaration` |
| `TypeElement.getNestingKind` | Check `KSClassDeclaration.parentDeclaration` and `inner` modifier |
| `TypeElement.getTypeParameters` | `ksClassDeclaration.typeParameters` |
| `TypeParameterElement.getBounds` | `ksTypeParameter.bounds` |
| `TypeParameterElement.getEnclosingElement` / `getGenericElement` | `ksTypeParameter.parentDeclaration` |
| `VariableElement.getConstantValue` | To be implemented |
| `VariableElement.getEnclosingElement` / `getSimpleName` | `ksValueParameter.parent` (a `KSNode?`; cast to `KSFunctionDeclaration` when the declaration is needed) / `ksValueParameter.name?.asString()` (`name` is a nullable `KSName?`) |
| `ArrayType.getComponentType` | `ksType.arguments.first().type` for `Array<T>` only (`arguments` holds `KSTypeArgument`s; `type` is a `KSTypeReference?`). Primitive arrays (`IntArray`, `ByteArray`, ... — Java `int[]` etc.) have no type arguments; branch on `ksType.declaration.qualifiedName?.asString()` (`kotlin.IntArray` → `resolver.builtIns.intType`, `kotlin.ByteArray` → `byteType`, etc.) |
| `DeclaredType.asElement` | `ksType.declaration` |
| `DeclaredType.getEnclosingType` | `ksType.declaration.parentDeclaration` |
| `DeclaredType.getTypeArguments` | `ksType.arguments` |
| `ExecutableType.getParameterTypes` | `ksFunctionDeclaration.parameters.map { it.type }` (resolved function type: `ksType.arguments.dropLast(1).map { it.type }`) |
| `ExecutableType.getReceiverType` | `ksFunctionDeclaration.extensionReceiver?.resolve()`, or `(ksFunctionDeclaration.parentDeclaration as? KSClassDeclaration)?.asType(typeArguments)` for member functions (no receiver for top-level / `Modifier.JAVA_STATIC`) |
| `ExecutableType.getReturnType` | `ksFunctionDeclaration.returnType` (resolved function type: `ksType.arguments.last().type`) |
| `ExecutableType.getTypeVariables` | `ksFunctionDeclaration.typeParameters` |
| `TypeMirror.getKind` | Compare with types in `KSBuiltIns` for primitive types, `Unit` type, otherwise declared types |
| `TypeVariable.asElement` / `getUpperBound` | `ksType.declaration` / `ksTypeParameter.bounds` |
| `TypeVariable.getLowerBound` | To be decided |
| `WildcardType.getExtendsBound` | `if (ksTypeArgument.variance == Variance.COVARIANT) ksTypeArgument.type else null` |
| `WildcardType.getSuperBound` | `if (ksTypeArgument.variance == Variance.CONTRAVARIANT) ksTypeArgument.type else null` |
| `Elements.getAllAnnotationMirrors` | `KSAnnotated.annotations` (`KSDeclaration.annotations`) |
| `Elements.getAllMembers` | `ksClassDeclaration.getAllFunctions()` / `ksClassDeclaration.getAllProperties()` (declared and inherited members; requires type resolution) |
| `Elements.getBinaryName` / `getDocComment` / `getElementValuesWithDefaults` / `hides` | To be decided / to be implemented |
| `Elements.getConstantExpression` | There is constant value, not expression |
| `Elements.getName` | `resolver.getKSNameFromString` |
| `Elements.getPackageElement` / `getPackageOf` | Package not supported (package information can be retrieved; operations on packages aren't possible) |
| `Elements.getTypeElement` | `Resolver.getClassDeclarationByName` |
| `Elements.overrides` | `resolver.overrides(overrider, overridee)` |
| `Elements.printElements` | KSP has basic `toString()` implementation on most classes |
| `Types.asElement` | `ksType.declaration` |
| `Types.asMemberOf` | `ksFunctionDeclaration.asMemberOf(containing)` / `ksPropertyDeclaration.asMemberOf(containing)` |
| `Types.boxedClass` / `unboxedType` / `getPrimitiveType` | Not needed (check `KSBuiltins`) |
| `Types.capture` | To be decided |
| `Types.contains` / `isAssignable` / `isSubtype` | `KSType.isAssignableFrom` |
| `Types.directSuperTypes` | `(ksType.declaration as KSClassDeclaration).superTypes` |
| `Types.erasure` | `ksType.starProjection()` |
| `Types.getArrayType` | `ksBuiltIns.arrayType.replace(...)` |
| `Types.getDeclaredType` | `ksClassDeclaration.asType` |
| `Types.getNoType` | `ksBuiltIns.nothingType` / `null` |
| `Types.getNullType` | Depending on context, `KSType.makeNullable()` could be useful |
| `Types.getWildcardType` | Use `Variance` in places expecting `KSTypeArgument` |
| `Types.isSameType` | `ksType.equals` |
| `Types.isSubsignature` | `functionTypeA == functionTypeB` / `functionTypeA == functionTypeB.starProjection()` |

## Notes

- A `KSType` for a function is just a signature represented by the `FunctionN<P1, ..., PN, R>` family.
- The official table (kotlin-web-site 0b10373) writes KSValueArguments, KSDeclarations.annotations and KSType.markNullable; the KSP API names are KSValueArgument, KSAnnotated.annotations and KSType.makeNullable() (checked against google/ksp 2.3.10 api sources), which this page uses.
- The official table maps parameter/return types to ksType.declaration.typeParameters and writes FunctionN<R, T1, ..., TN>; this page uses the resolved type arguments / declaration members and Kotlin's FunctionN<P1, ..., PN, R> order.
- The official table (kotlin-web-site 0b10373) maps overrides to KSFunctionDeclaration.overrides / KSPropertyDeclaration.overrides and asMemberOf to resolver.asMemberOf; in google/ksp 2.3.10 these are Resolver.overrides(overrider, overridee) and KSFunctionDeclaration/KSPropertyDeclaration.asMemberOf(containing: KSType), which this page uses (KSType.starProjection() does exist).
- The official table (kotlin-web-site 0b10373) maps getReceiverType to ksFunctionDeclaration.parentDeclaration / parentDeclaration.asType(...); parentDeclaration is a nullable KSDeclaration without asType(), so this page casts to KSClassDeclaration and distinguishes extensionReceiver (google/ksp 2.3.10 api).
- The official table maps isDefault to checking whether the parent declaration is an interface; that also matches abstract / static / private interface methods, so this page checks Modifier.JAVA_DEFAULT (Java) or, for Kotlin, a non-abstract, non-private interface member. The Kotlin condition is only a source-level approximation: whether a Kotlin interface member is compiled to a JVM default method depends on the -jvm-default (formerly -Xjvm-default) setting.
- The official table maps ArrayType.getComponentType to ksType.arguments.first(), which only holds for Array<T>; primitive arrays such as IntArray have empty arguments (first() would throw NoSuchElementException), so this page adds a branch on the declaration's qualified name mapped to the KSBuiltIns properties (intType, byteType, etc., checked against google/ksp api KSBuiltIns).
- The official table (kotlin-web-site 0b10373) writes ksValueParameter.parentDeclaration / ksValueParameter.simpleName and it.isVarArg; in google/ksp 2.3.10 KSValueParameter is not a KSDeclaration and exposes parent (from KSNode), name: KSName? (nullable) and isVararg, which this page uses.
- In google/ksp 2.3.10, KSType.arguments is List<KSTypeArgument> (each with a nullable type: KSTypeReference?), so the ArrayType.getComponentType row and the resolved-function-type forms of getParameterTypes / getReturnType read .type from the type arguments.
- Remaining items marked "To be implemented" / "To be decided" follow the official table (kotlin-web-site 0b10373).
- The official table (kotlin-web-site 0b10373) says getAllFunctions / getAllProperties are "to be implemented"; google/ksp 2.3.10 api declares KSClassDeclaration.getAllFunctions(): Sequence<KSFunctionDeclaration> and getAllProperties(): Sequence<KSPropertyDeclaration> (declared and inherited), which this page uses.

## Related

- [ksp-kotlin-model](./ksp-kotlin-model.md)
- [ksp-overview](./ksp-overview.md)
