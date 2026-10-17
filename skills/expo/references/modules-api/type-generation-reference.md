---
source: https://docs.expo.dev/modules/type-generation-reference/
---

# Type generation reference

Reference for the `expo-type-information` package: parses Swift Expo modules (via `sourcekitten`) and generates TypeScript interfaces and mocks. Works only on macOS; available for SDK 56 and later.

## Signature / Usage

```sh
npx expo install expo-type-information
brew install sourcekitten
```

The package consists of: a Swift parser based on `sourcekitten`, a type abstraction (`FileTypeInformation`), a TypeScript AST emitter, and a CLI.

## CLI reference

### Common CLI options

Every CLI command uses these options (the exception is `inline-modules-interface`, which has slightly different options).

| Flag | Description | Default |
| --- | --- | --- |
| `-i, --input-paths <filePaths...>` | Paths to Swift files for some module, glob patterns are allowed. | |
| `-m --module-path <modulePath>` | Path to Expo module root directory. | |
| `-o, --output-path <filePath>` | Path to save the generated output. If not provided the generated output is printed to console. | |
| `-t, --type-inference <typeInference>` | Level of type inference: `NO_INFERENCE`, `SIMPLE_INFERENCE`, or `PREPROCESS_AND_INFERENCE`. `PREPROCESS_AND_INFERENCE` can occasionally fail on some modules; if so, fall back to `SIMPLE_INFERENCE` or `NO_INFERENCE`. | `PREPROCESS_AND_INFERENCE` |
| `-s, --skip-unicode-character-mapping` | Skip mapping all non-ASCII characters in a file to ASCII strings. By default the mapping is performed because SourceKitten is inconsistent when calculating offsets of non-ASCII characters. | |
| `-w --watcher` | Starts a watcher that checks for changes in input-path file. | |

### Main commands

| Command | Description |
| --- | --- |
| `module-interface` | Generates a full TypeScript interface for a Swift module: **types.ts** (all types), **module.ts** (native module definition), **view.tsx** (one for each view), **index.ts** (re-exports). Accepts the common options. |
| `inline-modules-interface` | Creates a TypeScript interface for every Swift inline module in the project: **Module.generated.ts** (regenerated on each run) and **Module.tsx** (not regenerated if you change it). |
| `short-module-interface` | Creates a short interface: overwrites **ModuleName.generated.ts** and creates **ModuleName.ts** if not present. Can be used with inline modules. Accepts the common options. |
| `generate-mocks-for-file` | Generates mocks for a given Expo module. Accepts the common options. |

Options of `inline-modules-interface`:

| Flag | Description | Default |
| --- | --- | --- |
| `-a --app-json <appJsonPath>` | Path to the app config file where `inline.modules.watchedDirectories` are defined. | |
| `-w --watcher` | Starts a watcher that checks for changes in inline modules files. | |
| `-t, --type-inference <typeInference>` | Level of type inference (same values as above). | `SIMPLE_INFERENCE` |

### Other commands

Internal or very specific; all accept the common options.

| Command | Description |
| --- | --- |
| `other type-information` | Parses Swift module type information and outputs a `FileTypeInformation` JSON. |
| `other generate-module-types` | Generates a type declaration file content for a module. |
| `other generate-view-types` | Generates a type declaration file for a native View. |
| `other generate-jsx-intrinsics` | Generates a declaration file for a View, updates JSX intrinsics with the View props. |
| `other preprocess-file` | Prints the preprocessed file(s) right before parsing with `sourcekitten`; helps check how `--module-path`, `--input-path`, and `--type-inference` affect the parsed file. |

## Options / Props

Programmatic API.

| Function | Parameters | Returns | Description |
| --- | --- | --- | --- |
| `getFileTypeInformation(options)` | `options: GetFileTypeInformationOptions` | `Promise<FileTypeInformation \| null>` | Reads and extracts `FileTypeInformation` from a file path or a raw string of source code. With a raw string or `PREPROCESS_AND_INFERENCE`, a temporary file is created to facilitate parsing. Resolves to `null` if parsing failed. |
| `serializeTypeInformation(fileTypeinformation)` | `FileTypeInformation` | `FileTypeInformationSerialized` | For testing: maps Sets and Maps to Arrays so the result can be written to JSON. |
| `deserializeTypeInformation(fileTypeinformationSerialized)` | `FileTypeInformationSerialized` | `FileTypeInformation` | For testing: maps Arrays to Sets and Maps. |
| `generateConciseTsInterface(fileTypeInformation)` | `FileTypeInformation` | `Promise<{ moduleTypescriptInterfaceFileContent: string, volatileGeneratedFileContent: string }>` | Short interface: a volatile generated file with raw type definitions and a stable user-facing file wrapping the native module methods. |
| `generateFullTsInterface(fileTypeInformation)` | `FileTypeInformation` | `Promise<{ indexFile: OutputFile, moduleNativeFile: OutputFile, moduleTypesFile: OutputFile, moduleViewsFiles: OutputFile[] } \| null>` | Full multi-file interface; `null` if generation failed. |
| `generateJSXIntrinsicsFileContent(fileTypeInformation)` | `FileTypeInformation` | `Promise<string \| null>` | Declaration file content for a native View that mounts the View props on the global `JSXIntrinsics`. |
| `generateModuleTypesFileContent(fileTypeInformation)` | `FileTypeInformation` | `Promise<string \| null>` | Native module type declaration file content. |
| `generateViewTypesFileContent(fileTypeInformation)` | `FileTypeInformation` | `Promise<string \| null>` | Native View type declaration file content. |
| `generateMocks(files, outputLanguage)` | `files: FileTypeInformation[]`, `outputLanguage?: 'typescript' \| 'javascript'` (default `'javascript'`) | `Promise<void>` | Generates JavaScript/TypeScript mocks for each provided `FileTypeInformation`. |
| `getAllExpoModulesInWorkingDirectory()` | none | `Promise<FileTypeInformation[]>` | |
| `withPreparedSingleFile` (component) | `GetFileTypeInformationOptions` | React element | |

### Types

| Type | Shape |
| --- | --- |
| `GetFileTypeInformationOptions` | `input: StringInputOption \| FileInputOption`; `mapUnicodeCharacters: boolean`; `typeInference?: TypeInferenceOption` (defaults to `PREPROCESS_AND_INFERENCE`) |
| `StringInputOption` | `fileContent: string`; `language: 'Swift'`; `type: 'string'` |
| `FileInputOption` | `inputFileAbsolutePaths: string[]`; `type: 'file'` |
| `FileTypeInformation` | `declaredTypeIdentifiers: Set<string>`; `enums: EnumType[]`; `inferredTypeParametersCount: Map<string, number>`; `moduleClasses: ModuleClassDeclaration[]`; `records: RecordType[]`; `typeIdentifierDefinitionMap: TypeIdentifierDefinitionMap`; `usedTypeIdentifiers: Set<string>` |
| `FileTypeInformationSerialized` | `declaredTypeIdentifiersList: string[]`; `enums`; `inferredTypeParametersCountList`; `moduleClasses`; `records`; `typeIdentifierDefinitionList`; `usedTypeIdentifiersList: string[]` |
| `ModuleClassDeclaration` (extends `DefinitionOffset`) | `asyncFunctions`, `classes`, `constants`, `constructor`, `events`, `functions`, `name`, `properties`, `props`, `views` |
| `ClassDeclaration` (extends `DefinitionOffset`) | `asyncMethods`, `constructor`, `methods`, `name`, `properties` |
| `FunctionDeclaration` (extends `DefinitionOffset`) | `arguments: Argument[]`, `isStatic: boolean`, `name`, `parameters: Type[]`, `returnType: Type` |
| `ConstantDeclaration` / `PropertyDeclaration` (extends `DefinitionOffset`) | `name: string`, `type: Type` |
| `ConstructorDeclaration` (extends `DefinitionOffset`) | `arguments: Argument[]` |
| `PropDeclaration` (extends `DefinitionOffset`) | `arguments: Argument[]`, `name` |
| `ViewDeclaration` | alias of `ModuleClassDeclaration` |
| `EventDeclaration` | `string` |
| `DefinitionOffset` | `definitionOffset: number` (keeps declaration ordering as in the original file) |
| `Argument` / `Field` | `name: string \| undefined`, `type: Type` |
| `RecordType` | `fields: Field[]`, `name` |
| `EnumType` | `cases: EnumCase[]` (`EnumCase` is `string`), `name`, `stringBacked: boolean` |
| `Type` | `kind: TypeKind`, `type: BasicType \| TypeIdentifier \| AnonymousType` |
| `AnonymousType` | union of `ParametrizedType`, `SumType`, `OptionalType`, `DictionaryType`, `ArrayType` |
| `ParametrizedType` | `name: TypeIdentifier`, `types: Type[]` |
| `SumType` | `types: Type[]` |
| `DictionaryType` | `key: Type`, `value: Type` |
| `ArrayType` / `OptionalType` | alias of `Type`; the array / optional nature is implicit in the type system and on the parent type |
| `TypeIdentifier` | `string` |
| `IdentifierDefinition` | `definition: string \| RecordType \| EnumType \| ClassDeclaration`; `kind: IdentifierKind` |
| `TypeIdentifierDefinitionMap` | `Map<string, IdentifierDefinition>` |
| `OutputFile` | `content: string`, `name: string` |

### Enums

| Enum | Values |
| --- | --- |
| `BasicType` | `ANY = 0`, `STRING = 1`, `NUMBER = 2`, `BOOLEAN = 3`, `VOID = 4`, `UNDEFINED = 5`, `UNRESOLVED = 6` (a type that could not be resolved) |
| `IdentifierKind` | `BASIC = 0`, `ENUM = 1`, `RECORD = 2`, `CLASS = 3` |
| `TypeInferenceOption` | `NO_INFERENCE = 0`, `SIMPLE_INFERENCE = 1` (basic type inference), `PREPROCESS_AND_INFERENCE = 2` (preprocesses the file by injecting returns to extract more type info from sourcekitten) |
| `TypeKind` | `BASIC = 0`, `IDENTIFIER = 1`, `SUM = 2`, `PARAMETRIZED = 3`, `OPTIONAL = 4`, `ARRAY = 5`, `DICTIONARY = 6` |

## Notes

- Works only on macOS; requires `sourcekitten` (for example via Homebrew). Available for SDK 56 and later.
- With type inference on, computing type information may take more than twice the time.
- Swift parser limitations: nested classes are not fully resolved (a DSL `Class` in a module has `unresolved` method return types because `sourcekitten` limits resolving nested closures); `PREPROCESS_AND_INFERENCE` rewrites each `return expression` into `let return_expression = expression; return return_expression;` and may fail (mostly because of strings and comments), and tail-expression returns without `return` cannot be resolved; not all DSL declarations are parsed in every context (for example `Events` are parsed inside a `View` but not in a Module definition); Unicode characters break `sourcekitten` offsets.
- Supported Expo module DSL declarations: `AsyncFunction`, `Constant`, `Constructor`, `Events`, `Function`, `Name`, `Prop`, `Property`, `View`. Swift `struct` / `class` must conform to `Record`, and only properties marked `@Field` are parsed. Swift `enum`: basic cases are supported; associated values are not parsed.
- Distinct from the apple-swift skill (`sourcekitten` and Swift parsing here are tooling for Expo modules only).
- Source modificationDate: July 01, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [Inline modules reference](./inline-modules-reference.md)
- [Mocking native calls in Expo modules](./mocking.md)
- [Module API Reference](./module-api.md)
