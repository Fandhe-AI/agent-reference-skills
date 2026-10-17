---
source: https://www.typescriptlang.org/tsconfig/#Compiler_Diagnostics_6251
---

# Compiler Diagnostics options

Nine options for debugging a compilation: which files are included and why, module resolution tracing, and compiler performance data.

## Signature / Usage

```json
{
  "compilerOptions": {
    "explainFiles": true,
    "listEmittedFiles": true,
    "traceResolution": true
  }
}
```

## Options / Props

| Option | Default | Allowed | Description |
| --- | --- | --- | --- |
| `diagnostics` | — | — | Output compiler performance information after building. (Deprecated badge) |
| `explainFiles` | — | — | Print files read during the compilation including why it was included. |
| `extendedDiagnostics` | — | — | Output more detailed compiler performance information after building. |
| `generateCpuProfile` | `profile.cpuprofile` | — | Emit a v8 CPU profile of the compiler run for debugging. |
| `generateTrace` | — | — | Generates an event trace and a list of types. |
| `listEmittedFiles` | — | — | Print the names of emitted files after a compilation. |
| `listFiles` | — | — | Print all of the files read during the compilation. |
| `noCheck` | — | — | Disable full type checking (only critical parse and emit errors will be reported). |
| `traceResolution` | — | — | Log paths used during the `moduleResolution` process. |

## Notes

- The Default column is copied from the rendered `/tsconfig/` page; "—" means the page shows no default for that option.
- `diagnostics`: a subset of `extendedDiagnostics`; if a TypeScript compiler engineer asks for its results, using `extendedDiagnostics` instead does no harm. `extendedDiagnostics` helps discover where the compiler spends time; see the TypeScript wiki performance section.
- `explainFiles`: prints the files TypeScript sees and the reason each is part of the compilation (e.g. "Default library for target 'es5'", "Matched by include pattern '**/*' in 'tsconfig.json'"); meant for debugging how a file became part of your compile.
- `generateCpuProfile`: can only be used from the CLI (`--generateCpuProfile tsc-output.cpuprofile`); the file opens in the CPU profiler of a Chromium-based browser.
- `listEmittedFiles`: prints paths of generated files, useful in build chains or to check that expected files were emitted. TypeScript normally returns silently on success.
- `listFiles`: prints names of files that are part of the compilation; with TypeScript 4.2+ prefer `explainFiles`, which also gives the reason.
- `traceResolution`: print information about the resolution process for each processed file when debugging why a module is not included.
- `noCheck` and `generateTrace` have no body beyond their one-line description in the option page.
- Changed (7.0): the Go-based compiler is documented to keep the same errors, locations and messages as 6.0; parallelism flags (`--checkers`, `--builders`, `--singleThreaded`) are CLI-level and are described in the TypeScript 7.0 announcement, not in the tsconfig reference.

`explainFiles` example from the official page:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "explainFiles": true
  }
}
```

## Related

- [output-formatting](./output-formatting.md)
- [watch-options](./watch-options.md)
- [modules](./modules.md)
