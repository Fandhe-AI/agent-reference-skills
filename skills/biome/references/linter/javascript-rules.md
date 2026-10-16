# JavaScript/TypeScript rules

Biome provides 469 rules for JS/TS in 8 groups (as of Biome 2.5.15).

## Usage

This page is a rule listing, so there is no function signature. Rules are enabled and configured in `biome.json` as `linter.rules.<group>.<rule>`:

```json
{
  "linter": {
    "rules": {
      "suspicious": { "noConsole": "warn" },
      "nursery": { "noFloatingPromises": "error" }
    }
  }
}
```

## Category overview

| Category | Rules | Description |
|---------|---------|------|
| a11y (accessibility) | 37 | Prevents accessibility problems |
| complexity | 49 | Detects and simplifies complex code |
| correctness | 67 | Detects incorrect or useless code |
| nursery | 107 | Experimental rules under development |
| performance | 14 | Performance optimizations |
| security | 6 | Detects security risks |
| style | 87 | Keeps code consistent |
| suspicious | 102 | Detects suspicious patterns |

## a11y (accessibility) - representative rules

- `noAccessKey` - disallows the accesskey attribute
- `noAriaHiddenOnFocusable` - disallows aria-hidden on focusable elements
- `noAutofocus` - disallows the autofocus attribute
- `useAltText` - requires alternative text on img etc.
- `useAnchorContent` - requires content in anchor elements
- `useButtonType` - requires a type attribute on button
- `useHtmlLang` - requires a lang attribute on the html element
- `useValidAriaRole` - enforces valid ARIA roles

## complexity - representative rules

- `noBannedTypes` - detects use of banned types
- `noCommaOperator` - disallows the comma operator
- `noExcessiveCognitiveComplexity` - limits cognitive complexity
- `noForEach` - prefers for...of over forEach
- `noStaticOnlyClass` - detects classes with only static members
- `noUselessTypeConstraint` - detects useless type constraints
- `useFlatMap` - prefers flatMap over map + flat
- `useSimplifiedLogicExpression` - simplifies logical expressions

## correctness - representative rules

- `noConstAssign` - disallows reassigning const
- `noConstructorReturn` - disallows return in constructors
- `noGlobalObjectCalls` - disallows calling global objects
- `noInvalidBuiltinInstantiation` - disallows invalid new / calls of builtins
- `noUndeclaredVariables` - detects use of undeclared variables
- `noUnusedImports` - detects unused imports
- `noUnusedVariables` - detects unused variables
- `useExhaustiveDependencies` - exhaustive useEffect dependency arrays
- `useIsNan` - enforces isNaN() for NaN comparisons

## performance - representative rules

- `noBarrelFile` - disallows barrel files
- `noReExportAll` - disallows `export * from`
- `noDelete` - disallows the delete operator
- `useTopLevelRegex` - prefers top-level regular expression definitions

## security - representative rules

- `noBlankTarget` - detects `target="_blank"` without rel
- `noDangerouslySetInnerHtml` - disallows dangerouslySetInnerHTML
- `noGlobalEval` - disallows eval()
- `noScriptUrl` - disallows `javascript:` URLs
- `noSecrets` - detects strings that look like secrets

## style - representative rules

- `noDefaultExport` - disallows default exports
- `noEnum` - disallows enum
- `noNonNullAssertion` - disallows non-null assertions (!)
- `useConst` - enforces const for never-reassigned variables
- `useExportType` - enforces export type for type-only exports
- `useImportType` - enforces import type for type-only imports
- `useNamingConvention` - enforces naming conventions
- `useTemplate` - prefers template literals over string concatenation

## suspicious - representative rules

- `noArrayIndexKey` - disallows array indexes as keys
- `noConsole` - disallows console
- `noDebugger` - disallows debugger
- `noDoubleEquals` - enforces === over ==
- `noExplicitAny` - disallows the any type
- `noMisleadingInstantiator` - detects misleading constructors
- `noShadowRestrictedNames` - disallows shadowing builtin names
- `useAwait` - requires await inside async functions

## nursery - representative rules

- Rules under development. In stable releases they require explicit opt-in (not included in `recommended`)
- Representative examples as of 2.5.x:
  - Type-aware: `noFloatingPromises` / `noMisusedPromises` / `useExhaustiveSwitchCases` / `useStrictBooleanExpressions` / `useAwaitThenable` / `useNullishCoalescing` / `noUnsafeTypeAssertion`
  - General: `noReturnInFinally` / `noXorAsExponentiation` / `noImpliedEval` / `useExplicitReturnType`
  - React: `useReactCompiler` / `useReactFunctionComponentDefinition` / `useReactAsyncServerFunction`
  - Playwright: `noPlaywrightWaitForTimeout` / `noPlaywrightMissingAwait`, etc.
  - Drizzle: `noDrizzleDeleteWithoutWhere` / `noDrizzleUpdateWithoutWhere`
  - Tailwind: `noTailwindArbitraryValue` / `noTailwindRawColors` / `useSortedClasses` / `useTailwindShorthandClasses`
  - Svelte / Astro / Vue: `noSvelteExportLet` / `noAstroSetHtmlDirective` / `noVueRefAsOperand` / `useVueBaseImport`, etc.

## Notes

- In 2.5.0, 73 nursery rules were promoted to stable groups (correctness / suspicious / style / complexity / performance / security / a11y). The counts above are post-promotion values
- Placement correction: `useAnchorContent` is in a11y and `noCommaOperator` is in complexity (not security / style)
- `noInvalidNewBuiltin` was removed in 2.0.0 (bulk removal of deprecated rules). `noInvalidBuiltinInstantiation` is in correctness
- At documentation HEAD, further moves between groups are planned for the next release (not reflected in the 2.5.15 list)
