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
| `Element.getAnnotation` | `ksAnnotated.getAnnotationsByType(Foo::class)` / `ksAnnotated.isAnnotationPresent(Foo::class)` (`@KspExperimental`) |
| `Element.getAnnotationMirrors` | `ksDeclaration.annotations` |
| `Element.getEnclosedElements` | `ksDeclarationContainer.declarations` |
| `Element.getEnclosingElement` | `ksDeclaration.parentDeclaration` |
| `Element.getKind` | Type check and cast following `ClassKind` or `FunctionKind` |
| `Element.getModifiers` / `getSimpleName` | `ksDeclaration.modifiers` / `ksDeclaration.simpleName` |
| `ExecutableElement.getDefaultValue` | Approximation: for annotation members, read `ksAnnotation.defaultArguments` (the default values of the annotation members, as `KSValueArgument`s); there is no per-function accessor |
| `ExecutableElement.getParameters` | `ksFunctionDeclaration.parameters` |
| `ExecutableElement.getReceiverType` | `ksFunctionDeclaration.extensionReceiver` (Kotlin extension receiver; null if none). Java instance methods: containing `KSClassDeclaration` = `ksFunctionDeclaration.parentDeclaration as? KSClassDeclaration`; null for top-level / static |
| `ExecutableElement.getReturnType` | `ksFunctionDeclaration.returnType` |
| `ExecutableElement.getThrownTypes` | `resolver.getJvmCheckedException(ksFunctionDeclaration)` (`@KspExperimental`; Java `throws` / Kotlin `@Throws`) |
| `ExecutableElement.getTypeParameters` | `ksFunctionDeclaration.typeParameters` |
| `ExecutableElement.isDefault` | `Modifier.JAVA_DEFAULT in ksFunctionDeclaration.modifiers` (Java sources); for Kotlin interfaces, a source-level approximation: `!ksFunctionDeclaration.isAbstract && Modifier.PRIVATE !in ksFunctionDeclaration.modifiers && (ksFunctionDeclaration.parentDeclaration as? KSClassDeclaration)?.classKind == ClassKind.INTERFACE` |
| `ExecutableElement.isVarArgs` | `ksFunctionDeclaration.parameters.any { it.isVararg }` |
| `QualifiedNameable.getQualifiedName` | `ksDeclaration.qualifiedName` |
| `TypeElement.getEnclosedElements` / `getEnclosingElement` | `ksClassDeclaration.declarations` / `ksClassDeclaration.parentDeclaration` |
| `TypeElement.getNestingKind` | Approximation: check `KSClassDeclaration.parentDeclaration` and `inner` modifier (local / anonymous classes are not captured) |
| `TypeElement.getTypeParameters` | `ksClassDeclaration.typeParameters` |
| `TypeParameterElement.getBounds` | `ksTypeParameter.bounds` |
| `TypeParameterElement.getEnclosingElement` / `getGenericElement` | `ksTypeParameter.parentDeclaration` |
| `VariableElement.getConstantValue` | To be implemented |
| `VariableElement.getEnclosingElement` / `getSimpleName` | `ksValueParameter.parent` (a `KSNode?`; cast to `KSFunctionDeclaration` when the declaration is needed) / `ksValueParameter.name?.asString()` (`name` is a nullable `KSName?`) |
| `ArrayType.getComponentType` | `ksType.arguments.first().type` for `Array<T>` only (`arguments` holds `KSTypeArgument`s; `type` is a `KSTypeReference?`). Primitive arrays (`IntArray`, `ByteArray`, ... — Java `int[]` etc.) have no type arguments; branch on `ksType.declaration.qualifiedName?.asString()` (`kotlin.IntArray` → `resolver.builtIns.intType`, `kotlin.ByteArray` → `byteType`, etc.) |
| `DeclaredType.asElement` | `ksType.declaration` |
| `DeclaredType.getEnclosingType` | No direct equivalent. `ksType.declaration.parentDeclaration` gives the enclosing declaration only: type arguments of the enclosing type (such as `Outer<String>`) are not recovered, and it is non-null for nested non-`inner` classes where javax returns `NoType`. For `inner` classes, rebuild the outer type manually, e.g. via `(parentDeclaration as KSClassDeclaration).asType(...)` |
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
| `Elements.getBinaryName` / `hides` | To be decided / to be implemented |
| `Elements.getElementValuesWithDefaults` | Approximation: combine `ksAnnotation.arguments` with `ksAnnotation.defaultArguments` (the default values of the annotation members) |
| `Elements.getDocComment` | `ksDeclaration.docString` |
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
| `Types.isAssignable(t1, t2)` | `t2.isAssignableFrom(t1)` (the receiver is the target type). KSP maps Java `int` and `Integer` to `kotlin.Int`, so Java boxing / unboxing conversions are not modeled separately |
| `Types.isSubtype(t1, t2)` | No exact equivalent; `t2.isAssignableFrom(t1)` is an assign-compatibility check, used as an approximation (a JLS subtype check, e.g. `int` vs `Integer`, is not reproduced) |
| `Types.contains(t1, t2)` | No direct equivalent (type-argument containment); compare `KSTypeArgument.variance` and the bound types (`ksTypeArgument.type?.resolve()`) manually |
| `Types.directSupertypes` | Approximation: `(ksType.declaration as? KSClassDeclaration)?.superTypes` lists the declared supertypes in terms of the declaration's own type parameters (for `Child<String>` with `Child<T> : Parent<T>` it yields `Parent<T>`, not `Parent<String>`); substitute `ksType.arguments` for the declaration's `typeParameters` yourself (e.g. via `replace(...)`) to get concrete supertypes |
| `Types.erasure` | No direct equivalent / Approximation: `ksType.starProjection()` replaces type arguments with `*` (close to a raw type). For a type parameter, use its first bound (`(ksType.declaration as KSTypeParameter).bounds.first().resolve()`, then erase recursively); for `Array<T>`, erase the component type |
| `Types.getArrayType` | `ksBuiltIns.arrayType.replace(...)` |
| `Types.getDeclaredType` | Approximation: `ksClassDeclaration.asType(typeArguments)` (takes a list of `KSTypeArgument`) |
| `Types.getNoType` | No direct equivalent. `ksBuiltIns.nothingType` is Kotlin's bottom type, not javax `NoType` (`TypeKind.VOID` / `TypeKind.NONE`); for `TypeKind.NONE` (absence of a type, e.g. no superclass) use `null` |
| `Types.getNullType` | Depending on context, `KSType.makeNullable()` could be useful |
| `Types.getWildcardType` | Use `Variance` in places expecting `KSTypeArgument` |
| `Types.isSameType` | Approximation: `ksType.equals` (nullability and flexible Java types may make results differ from javax) |
| `Types.isSubsignature` | No direct equivalent; compare `simpleName`, type-parameter count/bounds and parameter types (`parameters.map { it.type.resolve() }`, erased as in the `Types.erasure` row) individually per JLS 8.4.2 (the return type is not part of the signature). For override checks use `resolver.overrides(overrider, overridee)` |

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
- The official table (kotlin-web-site 0b10373) lists getAnnotation / getDocComment as "to be implemented", getThrownTypes as not needed, and writes getEnclosingElements; google/ksp 2.3.10 api provides KSAnnotated.getAnnotationsByType / isAnnotationPresent (@KspExperimental), KSDeclaration.docString and Resolver.getJvmCheckedException (@KspExperimental), and the javax method is getEnclosingElement, which this page uses.
- The official table (kotlin-web-site 0b10373) maps Types.contains / isAssignable / isSubtype all to KSType.isAssignableFrom and writes Types.directSuperTypes as declaration.superTypes; these javax operations differ (containment, assignability, subtyping) and isAssignableFrom takes the target type as receiver, while the javax method is directSupertypes and declaration.superTypes are unsubstituted, so this page splits the rows and states the approximations.
- The official table (kotlin-web-site 0b10373) maps DeclaredType.getEnclosingType to parentDeclaration; this is not equivalent (no enclosing type arguments; non-null for nested non-inner classes where javax returns NoType).
- The official table maps Types.erasure to starProjection(); this is only an approximation (type parameters, arrays and nested types need separate handling).
- The official table maps Types.getNoType to nothingType / null; Nothing is the bottom type and is not equivalent to javax NoType.
- The official table maps Types.isSubsignature to FunctionN equality; this is not equivalent (it drops the method name and includes the return type).
- Rows marked "Approximation" (getNestingKind, getDeclaredType, isSameType) are only close to the javax semantics; the official table's wording is kept except for the stated qualifications.
- The official table (kotlin-web-site 0b10373) lists ExecutableElement.getDefaultValue and Elements.getElementValuesWithDefaults as "to be implemented"; google/ksp 2.3.10 api declares KSAnnotation.defaultArguments ("The default values of the annotation members"), which this page uses for annotation members.
- Remaining items marked "To be implemented" / "To be decided" follow the official table (kotlin-web-site 0b10373).
- The official table (kotlin-web-site 0b10373) says getAllFunctions / getAllProperties are "to be implemented"; google/ksp 2.3.10 api declares KSClassDeclaration.getAllFunctions(): Sequence<KSFunctionDeclaration> and getAllProperties(): Sequence<KSPropertyDeclaration> (declared and inherited), which this page uses.

## Related

- [ksp-kotlin-model](./ksp-kotlin-model.md)
- [ksp-overview](./ksp-overview.md)
