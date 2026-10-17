# tsconfig

| Name | Description | Path |
|------|-------------|------|
| Backwards Compatibility options | Nine legacy compiler options kept for backward compatibility. Deprecated in TypeScript 5.0, no effect from 5.5, and an error to specify in 6.0. | [backwards-compatibility.md](./backwards-compatibility.md) |
| Compiler Diagnostics options | Nine options for debugging a compilation: which files are included and why, module resolution tracing, and compiler performance data. | [compiler-diagnostics.md](./compiler-diagnostics.md) |
| Completeness options | Options to skip type checking of declaration files: `skipDefaultLibCheck` and `skipLibCheck`. | [completeness.md](./completeness.md) |
| Editor Support options | Options that affect the TypeScript language server and editor integration: `disableSizeLimit` and `plugins`. | [editor-support.md](./editor-support.md) |
| Emit options | 21 compiler options that control what `tsc` writes: JavaScript output location, declaration files, source maps, helpers and emit suppression. | [emit.md](./emit.md) |
| Interop Constraints options | Options that constrain or support interoperability between modules and between compilers: default-import synthesis, erasable syntax, per-file transpilation safety, and verbatim import/export emit. | [interop-constraints.md](./interop-constraints.md) |
| JavaScript Support options | Options that let JavaScript files participate in a TypeScript program: `allowJs`, `checkJs` and `maxNodeModuleJsDepth`. | [javascript-support.md](./javascript-support.md) |
| Language and Environment options | 13 compiler options that set the emitted JavaScript language version (`target`), bundled library declarations (`lib`), JSX emit, decorators and module/script detection. | [language-and-environment.md](./language-and-environment.md) |
| Modules options | 19 compiler options for the module system, module resolution, path mapping, root directories and the set of ambient `@types` packages. | [modules.md](./modules.md) |
| Output Formatting options | Three options that control how compiler messages are printed: error truncation, watch-mode screen clearing and colorized output. | [output-formatting.md](./output-formatting.md) |
| Projects options | Six options for composite projects, project references and incremental builds (`.tsbuildinfo`). | [projects.md](./projects.md) |
| Top Level fields (files / extends / include / exclude / references) | Root options of a `tsconfig.json` that control which files are part of the program, which base config is inherited, and which projects are referenced. | [top-level.md](./top-level.md) |
| typeAcquisition | The top-level `typeAcquisition` object controls automatic download of type declarations for JavaScript projects. | [type-acquisition.md](./type-acquisition.md) |
| Type Checking options | 20 compiler options that control how strictly the type checker validates code, from the `strict` family to unused-code and implicit-return checks. | [type-checking.md](./type-checking.md) |
| Watch and Build Modes + watchOptions | The `assumeChangesOnlyAffectDirectDependencies` compiler option plus the six `watchOptions` keys that configure how `tsc --watch` watches files and directories. | [watch-options.md](./watch-options.md) |
