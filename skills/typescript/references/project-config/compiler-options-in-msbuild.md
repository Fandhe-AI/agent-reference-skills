---
source: https://www.typescriptlang.org/docs/handbook/compiler-options-in-msbuild.html
---

# Compiler Options in MSBuild

Which compiler options are available in MSBuild projects. In an MSBuild based project (such as ASP.NET Core) TypeScript can be configured via a `tsconfig.json` or via the project settings.

## Signature / Usage

Project settings are defined as `PropertyGroup`s in the `.csproj`:

```xml
<PropertyGroup>
  <TypeScriptNoEmitOnError>true</TypeScriptNoEmitOnError>
  <TypeScriptNoImplicitReturns>true</TypeScriptNoImplicitReturns>
</PropertyGroup>
```

Debug and Release configurations:

```xml
<PropertyGroup Condition="'$(Configuration)' == 'Debug'">
  <TypeScriptRemoveComments>false</TypeScriptRemoveComments>
  <TypeScriptSourceMap>true</TypeScriptSourceMap>
</PropertyGroup>

<PropertyGroup Condition="'$(Configuration)' == 'Release'">
  <TypeScriptRemoveComments>true</TypeScriptRemoveComments>
  <TypeScriptSourceMap>false</TypeScriptSourceMap>
</PropertyGroup>
```

Flags without a mapping, via `TypeScriptAdditionalFlags`:

```xml
<TypeScriptAdditionalFlags> $(TypeScriptAdditionalFlags) --noPropertyAccessFromIndexSignature</TypeScriptAdditionalFlags>
```

## Options / Props

| MSBuild Config Name | TSC Flag |
|---------------------|----------|
| `<TypeScriptAllowJS>` | `--allowJs` |
| `<TypeScriptRemoveComments>` | `--removeComments` |
| `<TypeScriptNoImplicitAny>` | `--noImplicitAny` |
| `<TypeScriptGeneratesDeclarations>` | `--declaration` |
| `<TypeScriptModuleKind>` | `--module` |
| `<TypeScriptJSXEmit>` | `--jsx` |
| `<TypeScriptOutDir>` | `--outDir` |
| `<TypeScriptSourceMap>` | `--sourcemap` |
| `<TypeScriptTarget>` | `--target` |
| `<TypeScriptNoResolve>` | `--noResolve` |
| `<TypeScriptMapRoot>` | `--mapRoot` |
| `<TypeScriptSourceRoot>` | `--sourceRoot` |
| `<TypeScriptCharset>` | `--charset` |
| `<TypeScriptEmitBOM>` | `--emitBOM` |
| `<TypeScriptNoLib>` | `--noLib` |
| `<TypeScriptPreserveConstEnums>` | `--preserveConstEnums` |
| `<TypeScriptSuppressImplicitAnyIndexErrors>` | `--suppressImplicitAnyIndexErrors` |
| `<TypeScriptNoEmitHelpers>` | `--noEmitHelpers` |
| `<TypeScriptInlineSourceMap>` | `--inlineSourceMap` |
| `<TypeScriptInlineSources>` | `--inlineSources` |
| `<TypeScriptNewLine>` | `--newLine` |
| `<TypeScriptIsolatedModules>` | `--isolatedModules` |
| `<TypeScriptEmitDecoratorMetadata>` | `--emitDecoratorMetadata` |
| `<TypeScriptRootDir>` | `--rootDir` |
| `<TypeScriptExperimentalDecorators>` | `--experimentalDecorators` |
| `<TypeScriptModuleResolution>` | `--moduleResolution` |
| `<TypeScriptSuppressExcessPropertyErrors>` | `--suppressExcessPropertyErrors` |
| `<TypeScriptReactNamespace>` | `--reactNamespace` |
| `<TypeScriptSkipDefaultLibCheck>` | `--skipDefaultLibCheck` |
| `<TypeScriptAllowUnusedLabels>` | `--allowUnusedLabels` |
| `<TypeScriptNoImplicitReturns>` | `--noImplicitReturns` |
| `<TypeScriptNoFallthroughCasesInSwitch>` | `--noFallthroughCasesInSwitch` |
| `<TypeScriptAllowUnreachableCode>` | `--allowUnreachableCode` |
| `<TypeScriptForceConsistentCasingInFileNames>` | `--forceConsistentCasingInFileNames` |
| `<TypeScriptAllowSyntheticDefaultImports>` | `--allowSyntheticDefaultImports` |
| `<TypeScriptNoImplicitUseStrict>` | `--noImplicitUseStrict` |
| `<TypeScriptLib>` | `--lib` |
| `<TypeScriptBaseUrl>` | `--baseUrl` |
| `<TypeScriptDeclarationDir>` | `--declarationDir` |
| `<TypeScriptNoImplicitThis>` | `--noImplicitThis` |
| `<TypeScriptSkipLibCheck>` | `--skipLibCheck` |
| `<TypeScriptStrictNullChecks>` | `--strictNullChecks` |
| `<TypeScriptNoUnusedLocals>` | `--noUnusedLocals` |
| `<TypeScriptNoUnusedParameters>` | `--noUnusedParameters` |
| `<TypeScriptAlwaysStrict>` | `--alwaysStrict` |
| `<TypeScriptImportHelpers>` | `--importHelpers` |
| `<TypeScriptJSXFactory>` | `--jsxFactory` |
| `<TypeScriptStripInternal>` | `--stripInternal` |
| `<TypeScriptCheckJs>` | `--checkJs` |
| `<TypeScriptDownlevelIteration>` | `--downlevelIteration` |
| `<TypeScriptStrict>` | `--strict` |
| `<TypeScriptNoStrictGenericChecks>` | `--noStrictGenericChecks` |
| `<TypeScriptPreserveSymlinks>` | `--preserveSymlinks` |
| `<TypeScriptStrictFunctionTypes>` | `--strictFunctionTypes` |
| `<TypeScriptStrictPropertyInitialization>` | `--strictPropertyInitialization` |
| `<TypeScriptESModuleInterop>` | `--esModuleInterop` |
| `<TypeScriptEmitDeclarationOnly>` | `--emitDeclarationOnly` |
| `<TypeScriptKeyofStringsOnly>` | `--keyofStringsOnly` |
| `<TypeScriptUseDefineForClassFields>` | `--useDefineForClassFields` |
| `<TypeScriptDeclarationMap>` | `--declarationMap` |
| `<TypeScriptResolveJsonModule>` | `--resolveJsonModule` |
| `<TypeScriptStrictBindCallApply>` | `--strictBindCallApply` |
| `<TypeScriptNoEmitOnError>` | `--noEmitOnError` |

Other project properties:

| Property | Description |
|----------|-------------|
| `TypeScriptAdditionalFlags` | Passes flags without a mapping directly to the TypeScript CLI. |
| `<TypeScriptToolsVersion>1.7</TypeScriptToolsVersion>` | Identifies the compiler version to use to build (1.7 in the example). If not specified, the latest compiler version installed on the machine is used. Users of newer versions see a prompt to upgrade the project on first load. |
| `<TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>` | For projects built by a different tool (e.g. gulp, grunt) while using VS for editing and debugging: keeps editing support but no build on F5. |
| `<TypeScriptEnableIncrementalMSBuild>false</TypeScriptEnableIncrementalMSBuild>` | By default MSBuild only runs the compiler when source files changed since the last compilation (TypeScript 4.2 Beta and later). Set to `false` to invoke the compiler on every run, e.g. when the `incremental` option is enabled. |

## Notes

- A `tsconfig.json` is recommended when possible; it becomes the source of truth for files and configuration. Add one as a "TypeScript JSON Configuration File" item in modern Visual Studio.
- Deprecated (6.0) / Removed (7.0): mappings for `--baseUrl`, `--downlevelIteration`, `--moduleResolution` (`node10` / `classic`), `--module` (`amd` / `umd` / `systemjs` / `none`), `--alwaysStrict` (as `false`), `--allowSyntheticDefaultImports` / `--esModuleInterop` (as `false`) correspond to options deprecated in 6.0 and rejected in 7.0 (7.0 announcement blog). The page does not mention these deprecations itself.
- The page's mapping list contains legacy options (`charset`, `keyofStringsOnly`, `noImplicitUseStrict`, `noStrictGenericChecks`, `suppressExcessPropertyErrors`, `suppressImplicitAnyIndexErrors`); `charset` is described as "No longer supported".
- Whether the MSBuild integration (`Microsoft.TypeScript.MSBuild`) works with TypeScript 7.0 is not stated in the available sources.

## Related

- [tsconfig-json.md](./tsconfig-json.md)
- [compiler-options-cli.md](./compiler-options-cli.md)
- [integrating-with-build-tools.md](./integrating-with-build-tools.md)
- [project-references.md](./project-references.md)
