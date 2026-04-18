# rustc Book

Reference for The rustc Book — the official guide to the Rust compiler (`rustc`).

| Name | Description | Path |
|------|-------------|------|
| Command-line Arguments | All flags and options accepted by `rustc` | [command-line-arguments.md](./command-line-arguments.md) |
| Codegen Options | Code generation options passed via `-C`; optimization, debug, linking, LTO, PGO | [codegen-options.md](./codegen-options.md) |
| Lints | Lint levels, how to set them via flags and attributes, lint groups | [lints.md](./lints.md) |
| JSON Output | Machine-readable JSON error and artifact output format | [json.md](./json.md) |
| Targets | Target triples, built-in targets, target features, custom JSON targets | [targets.md](./targets.md) |
| Profile-Guided Optimization | PGO workflow: instrumentation, profiling, and optimized rebuild | [profile-guided-optimization.md](./profile-guided-optimization.md) |
| Instrument Coverage | LLVM-based source-level code coverage instrumentation | [instrument-coverage.md](./instrument-coverage.md) |
| Linker-Plugin Based LTO | Cross-language LTO via linker plugin with Clang/Flang | [linker-plugin-lto.md](./linker-plugin-lto.md) |
| Sanitizers | Runtime bug detectors: ASan, TSan, MSan, CFI, SafeStack, and more | [sanitizers.md](./sanitizers.md) |
| Exploit Mitigations | Security hardening: PIE, RELRO, NX, stack probes, CFI, SSP | [exploit-mitigations.md](./exploit-mitigations.md) |
| Check cfg | `--check-cfg` for compile-time validation of conditional compilation | [check-cfg.md](./check-cfg.md) |
| Platform Support | Three-tier system (guaranteed to work / build / best-effort) | [platform-support.md](./platform-support.md) |
| Tests | `--test` flag, test attributes, and test harness behavior | [tests.md](./tests.md) |
| Contributing | Resources for contributing to `rustc` and this book | [contributing.md](./contributing.md) |
