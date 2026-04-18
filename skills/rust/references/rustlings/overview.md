# Rustlings Overview

Small exercises to get you used to reading and writing Rust code. Intended to be worked through in parallel with [The Rust Programming Language](https://doc.rust-lang.org/book/) (TRPL / "The Book").

## What Rustlings Is

Rustlings is an official Rust project (maintained at `rust-lang/rustlings`) that provides a collection of hands-on exercises covering core Rust concepts. Each exercise is a small Rust source file containing compile errors or incomplete logic that the learner must fix. A CLI tool drives the workflow: it watches for file changes, compiles exercises, and provides hints on demand.

It is **not** a replacement for The Book — it is a companion resource that reinforces concepts through practice while you read.

## Prerequisites

- **Rust toolchain** (stable, latest): install via [rustup](https://rustup.rs/) — `rustup` also installs `cargo`
- **Linux**: ensure `gcc` is available (linker)
- **macOS**: ensure Xcode command-line tools are installed (`xcode-select --install`)
- `~/.cargo/bin` must be on your `PATH`

## Installation & Initialization

```bash
# Install the rustlings binary
cargo install rustlings

# Initialize the exercises workspace (creates a ./rustlings/ directory)
rustlings init

# Enter the workspace
cd rustlings

# Start watch mode (recommended entry point)
rustlings
```

The `init` command clones the exercise files into the current directory. All subsequent commands are run from inside that directory.

## CLI Commands

### Watch Mode (default)

Running `rustlings` (no subcommand) enters watch mode. It automatically recompiles the current exercise whenever you save the file.

| Key (in watch mode) | Action |
|---------------------|--------|
| `h` | Print hint for the current exercise |
| `l` | Open the interactive exercise list |
| `r` | Manually rerun the current exercise (with `--manual-run` flag) |
| `n` | Move to the next exercise |
| `q` | Quit watch mode |

### Other Subcommands

| Command | Description |
|---------|-------------|
| `rustlings run <exercise>` | Compile and run a specific exercise by name |
| `rustlings hint <exercise>` | Print the hint for a specific exercise |
| `rustlings list` | List all exercises with their completion status |
| `rustlings reset <exercise>` | Reset an exercise file to its original state |
| `rustlings --manual-run` | Start watch mode without auto-rerun on save |

## Exercise Structure

Exercises live in the `exercises/` directory, organized into numbered subdirectories. The numbering defines the recommended learning order.

| # | Category | TRPL Chapter(s) |
|---|----------|-----------------|
| 00 | `intro` | — |
| 01 | `variables` | §3.1 |
| 02 | `functions` | §3.3 |
| 03 | `if` | §3.5 |
| 04 | `primitive_types` | §3.2, §4.3 |
| 05 | `vecs` | §8.1 |
| 06 | `move_semantics` | §4.1–4.2 |
| 07 | `structs` | §5.1, §5.3 |
| 08 | `enums` | §6, §18.3 |
| 09 | `strings` | §8.2 |
| 10 | `modules` | §7 |
| 11 | `hashmaps` | §8.3 |
| 12 | `options` | §10.1 |
| 13 | `error_handling` | §9 |
| 14 | `generics` | §10 |
| 15 | `traits` | §10.2 |
| 16 | `lifetimes` | §10.3 |
| 17 | `tests` | §11.1 |
| 18 | `iterators` | §13.2–13.4 |
| 19 | `smart_pointers` | §15, §16.3 |
| 20 | `threads` | §16.1–16.3 |
| 21 | `macros` | §19.6 |
| 22 | `clippy` | §21.4 |
| 23 | `conversions` | — |

Each category folder contains multiple numbered `.rs` files (e.g., `variables1.rs`, `variables2.rs`, …). The `intro` category exists to verify the toolchain is working before the real exercises begin.

## Relationship to The Book (TRPL)

The table above maps each exercise category to the corresponding section of [The Rust Programming Language](https://doc.rust-lang.org/book/). The intended workflow is:

1. Read the relevant TRPL section.
2. Attempt the matching Rustlings exercises.
3. Use `h` (hint) or the hint text in each `.rs` file when stuck.

Rustlings does **not** teach concepts through prose — it assumes the learner consults The Book for explanations.

## Community Exercises

Third-party exercise packs can be used alongside the official exercises. See [Community Exercises](https://rustlings.rust-lang.org/community-exercises/) on the official site for a curated list.

## Notes

- Exercise files contain a `// I AM NOT DONE` comment marker. Remove it (or the CLI marks the exercise complete) once you have fixed the code.
- The `clippy` category exercises require passing `cargo clippy` lints, not just compilation.
- The `conversions` category covers `From`/`Into`, `TryFrom`/`TryInto`, `FromStr`, and `AsRef`/`AsMut` — it has no direct single TRPL chapter mapping.

## Official References

- Repository: https://github.com/rust-lang/rustlings
- Official site: https://rustlings.rust-lang.org
- The Rust Programming Language (Book): https://doc.rust-lang.org/book/
- Crates.io: https://crates.io/crates/rustlings
