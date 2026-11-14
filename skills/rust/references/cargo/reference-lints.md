# Lints

Cargo supports a `[lints]` table for configuring lint levels for `rustc`, Clippy, and `rustdoc` lints, as well as Cargo's own lint system.

## `[lints]` Table in Cargo.toml (MSRV: 1.74)

Configure lint levels per tool:

```toml
[lints.rust]
unsafe_code = "forbid"
unused_variables = "warn"

[lints.clippy]
enum_glob_use = "deny"
pedantic = { level = "warn", priority = -1 }  # lint group with priority

[lints.rustdoc]
missing_crate_level_docs = "warn"
```

**Levels**: `"allow"`, `"warn"`, `"deny"`, `"forbid"`

**Priority**: Signed integer — lower value = lower priority. Useful when applying a group at low priority and overriding specific lints at higher priority:

```toml
[lints.clippy]
all = { level = "warn", priority = -1 }
dbg_macro = "deny"   # overrides "all" group for this specific lint
```

## Workspace Lint Inheritance (MSRV: 1.74)

Define lints once in the workspace root:

```toml
# Root Cargo.toml
[workspace.lints.rust]
unsafe_code = "forbid"

[workspace.lints.clippy]
enum_glob_use = "deny"
```

Each member must explicitly opt in:

```toml
# Member Cargo.toml
[lints]
workspace = true
```

Note: `workspace = true` is NOT automatic — it must be declared in each member.

## Cargo's Own Lint System (stable since 1.100)

Cargo emits its own lints, configured in the `[lints.cargo]` table of `Cargo.toml`. The key is the lint name without the `cargo::` prefix. Before Rust 1.100 this system was unstable (nightly-only, `-Zcargo-lints`).

```toml
[lints.cargo]
unused_dependencies = "deny"
```

### Lint Groups

| Group | Default Level | Description |
|-------|--------------|-------------|
| `cargo::default` | warn/deny | All lints that are on by default (correctness, suspicious, style, complexity, perf) |
| `cargo::correctness` | deny | Code that is outright wrong or useless |
| `cargo::style` | warn | Code that should be written in a more idiomatic way |
| `cargo::suspicious` | warn | Code that is most likely wrong or useless |
| `cargo::pedantic` | allow | Lints which are rather strict or have occasional false positives |
| `cargo::restriction` | allow | Lints which prevent the use of Cargo features |

### Allow-by-Default Cargo Lints

| Lint | Group |
|------|-------|
| `manual_readme` | `pedantic` |
| `non_kebab_case_bins` | `pedantic` |
| `non_kebab_case_features` | `restriction` |
| `non_kebab_case_packages` | `restriction` |
| `non_snake_case_features` | `restriction` |
| `non_snake_case_packages` | `restriction` |

### Warn-by-Default Cargo Lints

| Lint | Group |
|------|-------|
| `blanket_hint_mostly_unused` | `suspicious` |
| `missing_lints_inheritance` | `suspicious` |
| `redundant_homepage` | `style` |
| `unknown_lints` | `suspicious` |
| `unused_dependencies` | `style` |
| `unused_workspace_dependencies` | `suspicious` |
| `unused_workspace_package_fields` | `suspicious` |

### Deny-by-Default Cargo Lints

| Lint | Group |
|------|-------|
| `text_direction_codepoint_in_comment` | `correctness` |
| `text_direction_codepoint_in_literal` | `correctness` |

### `unused_dependencies`

Checks for dependencies that are not used by any of the cargo targets (slows down compilation). It is only emitted in specific circumstances: only the selected packages are checked, the cargo target selection flags determine which dependencies tables are checked, and `[dev-dependencies]` are unchecked. `cargo check` lints `[build-dependencies]` and `[dependencies]`. There can be false positives when depending on a transitive dependency to activate a feature; for false positives from pinning the version of a transitive dependency, move the dependency to the `target."cfg(false)".dependencies` table.

```toml
[package]
name = "foo"

[dependencies]
unused = "1"
```

## Common Patterns

Forbid all unsafe code workspace-wide:

```toml
# Root Cargo.toml
[workspace.lints.rust]
unsafe_code = "forbid"

# Each member
[lints]
workspace = true
```

Enable strict Clippy lints at low priority with specific overrides:

```toml
[lints.clippy]
all = { level = "warn", priority = -1 }
pedantic = { level = "warn", priority = -1 }
must_use_candidate = "allow"   # too noisy for this project
```

## Notes

- The `[lints]` table in `Cargo.toml` is equivalent to passing `-A`/`-W`/`-D`/`-F` flags to `rustc`/`clippy`, but centralized and per-package.
- Cargo's own lint system is stable as of 1.100 (the release notes introduce it together with the `cargo::unused_dependencies` lint); it was nightly-only before.
- The Cargo lint lists above were replaced with the Cargo reference at the cargo commit shipped with Rust 1.100.0; lint names in earlier versions of this page (for example `redundant_readme`, `implicit_minimum_version_req`) are not in that reference.
- The `unused_dependencies` snippet is the official "Example" (the official page then shows the corrected manifest without the dependency).
- Source: https://doc.rust-lang.org/cargo/reference/lints.html (pinned: https://raw.githubusercontent.com/rust-lang/cargo/3acc79c0c841844675bc53a605922dbfc441e750/doc/book/src/reference/lints.md, cargo@3acc79c, retrieved 2026-11-14)
- `workspace = true` and individual lint settings cannot be combined in the same `[lints]` table.

## Related

- [reference-manifest.md](./reference-manifest.md)
- [reference-workspaces.md](./reference-workspaces.md)
