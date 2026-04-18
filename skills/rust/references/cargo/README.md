# Cargo

Reference documentation for the Cargo build tool and package manager, distilled from the [Cargo Book](https://doc.rust-lang.org/cargo/).

| Name | Description | Path |
|------|-------------|------|
| Getting Started | Installation, `cargo new`, `cargo build`, `cargo run` | [./getting-started.md](./getting-started.md) |
| Cargo Guide | Why Cargo exists, package layout, dependencies, Cargo.toml vs Cargo.lock, tests, CI | [./cargo-guide.md](./cargo-guide.md) |
| The Manifest Format | All `Cargo.toml` fields: `[package]`, targets, `[features]`, `[lints]`, `[profile]` | [./reference-manifest.md](./reference-manifest.md) |
| Cargo.toml vs Cargo.lock | Purpose of each file, when to commit, updating dependencies | [./reference-cargo-toml.md](./reference-cargo-toml.md) |
| Workspaces | Multi-package workspaces, shared deps/lints/package fields, virtual workspace | [./reference-workspaces.md](./reference-workspaces.md) |
| Specifying Dependencies | Version syntax (^, ~, *, =), git/path/registry sources, platform-specific, renaming | [./reference-specifying-dependencies.md](./reference-specifying-dependencies.md) |
| Overriding Dependencies | `[patch]` section, local testing, `[replace]` (deprecated), `paths` overrides | [./reference-overriding-dependencies.md](./reference-overriding-dependencies.md) |
| Features | Defining features, optional deps, `dep:` prefix, feature unification, resolver v2 | [./reference-features.md](./reference-features.md) |
| Profiles | Built-in profiles (dev/release/test/bench), settings, custom profiles, overrides | [./reference-profiles.md](./reference-profiles.md) |
| Configuration | `.cargo/config.toml` hierarchy, all config tables, env var overrides | [./reference-config.md](./reference-config.md) |
| Environment Variables | Variables Cargo reads, sets for crates, and sets for build scripts | [./reference-environment-variables.md](./reference-environment-variables.md) |
| Build Scripts | `build.rs`, `cargo::` instructions, linking, `OUT_DIR`, `-sys` convention | [./reference-build-scripts.md](./reference-build-scripts.md) |
| External Tools | Custom subcommands (`cargo-*`), `--message-format=json`, `cargo metadata` | [./reference-external-tools.md](./reference-external-tools.md) |
| Lints | `[lints]` table, workspace lints, Cargo's own lint system (nightly) | [./reference-lints.md](./reference-lints.md) |
| Publishing on crates.io | `cargo login`, `cargo publish`, `cargo yank`, `cargo owner`, required fields | [./reference-publishing.md](./reference-publishing.md) |
| Registry Authentication | Credential providers, `cargo:token`, keychain providers, CI setup | [./reference-registry-auth.md](./reference-registry-auth.md) |
| Registries | Alternate registries, git vs sparse protocol, publishing, configuration | [./reference-registries.md](./reference-registries.md) |
| Dependency Resolution | Resolver algorithm, version selection, resolver versions (1/2/3), troubleshooting | [./reference-resolver.md](./reference-resolver.md) |
| SemVer Compatibility | Breaking vs non-breaking changes for structs, enums, traits, functions, features | [./reference-semver.md](./reference-semver.md) |
| Source Replacement | Vendoring (`cargo vendor`), local/directory/registry sources, mirroring | [./reference-source-replacement.md](./reference-source-replacement.md) |
| Unstable Features | Nightly-only features: `build-std`, `artifact-dir`, `script`, `gc`, etc. | [./reference-unstable.md](./reference-unstable.md) |
| Cargo Commands | All CLI commands: build, test, run, doc, add, publish, install, tree, vendor, etc. | [./commands.md](./commands.md) |
| FAQ | Common questions: offline use, lock files, version conflicts, build performance | [./faq.md](./faq.md) |
