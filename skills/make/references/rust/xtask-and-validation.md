---
source: https://github.com/matklad/cargo-xtask
---

# xtask and Validation

`cargo xtask` is a naming convention and a small `.cargo/config.toml` alias trick — not a Cargo
subcommand, not a Cargo feature, and not something the Cargo Book documents. It is included
here because it is the standard way Rust projects add cross-platform (including native Windows)
automation without a shell dependency, which matters when deciding whether Make itself, `xtask`,
or plain `cargo` commands should be the entry point for a given operation.

## Signature / Usage

```toml
# .cargo/config.toml (workspace root)
[alias]
xtask = "run --package xtask --"
```

```toml
# Cargo.toml (workspace root) — xtask is an ordinary workspace member
[workspace]
members = ["main-crate", "xtask"]
```

```bash
# Invocation: the alias expands to `cargo run --package xtask -- <task-name> <args...>`
cargo xtask <task-name> [args...]
```

```rust
// xtask/src/main.rs — sketch only; this is this pattern's own contract, not an
// official Cargo API. Real implementations vary.
use std::process::{Command, ExitCode};

fn main() -> ExitCode {
    let mut args = std::env::args().skip(1);
    match args.next().as_deref() {
        Some("ci") => run_ci(),
        Some(other) => {
            eprintln!("unknown task: {other}");
            ExitCode::FAILURE
        }
        None => {
            eprintln!("usage: cargo xtask <task>");
            ExitCode::FAILURE
        }
    }
}

fn run_ci() -> ExitCode {
    // CARGO env var points at the cargo binary invoking this xtask, so tasks
    // can shell out to the *same* cargo/toolchain rather than assuming a PATH lookup.
    let cargo = std::env::var("CARGO").unwrap_or_else(|_| "cargo".into());
    let status = Command::new(cargo).args(["test", "--workspace"]).status();
    match status {
        Ok(s) if s.success() => ExitCode::SUCCESS,
        // Propagate the child's exit code/failure rather than swallowing it.
        _ => ExitCode::FAILURE,
    }
}
```

## How the Pattern Works (Source-backed behavior, cargo-xtask README)

1. The project is a Cargo workspace with (at least) two members: the main crate(s) and an
   `xtask` binary crate.
2. `.cargo/config.toml` defines `[alias] xtask = "run --package xtask --"`. This is a plain
   Cargo alias — it works because `cargo <alias-name>` expands to the aliased command line
   before Cargo parses anything else. `cargo xtask foo` therefore literally runs
   `cargo run --package xtask -- foo`.
3. The `xtask` binary receives `foo` (and any further args) as its own `argv`, dispatches on
   task name, and does its work in Rust — including spawning subprocesses (e.g. re-invoking
   `cargo build`/`cargo test` via the `CARGO` environment variable, which points at the cargo
   binary that is currently running, rather than assuming a bare `cargo` on `PATH`).
4. Exit code propagation is the xtask binary's own responsibility: if it spawns a subprocess,
   it must forward that subprocess's success/failure to its own process exit code (e.g. via
   `std::process::ExitCode`), otherwise a failing sub-step is silently reported as success to
   whatever invoked `cargo xtask`.

Source: https://github.com/matklad/cargo-xtask (README, the primary write-up of this pattern;
confirmed 2026-09-26). This is a community pattern document, not an official Rust/Cargo
resource — treat every claim above as attributed to that README, not to the Cargo Book.

## Official Status (explicit non-endorsement)

> cargo-xtask is **not an officially recommended workflow**, though it is used by Cargo itself
> and is widespread in the ecosystem. The name `xtask` was deliberately chosen to avoid
> colliding with any future built-in Cargo task feature — it is a stand-in, not a permanent
> Cargo API.

Do not present `cargo xtask` anywhere in this skill's samples/scripts as if it were a Cargo
subcommand shipped by `cargo` itself. Every reference to it must make clear it is (a) a
convention, (b) implemented by the project's own `xtask` crate, and (c) invoked only through
the alias the project itself defines.

## Design guidance: when *not* to reach for xtask

The cargo-xtask README's own guidance, and this skill's design position, agree: **do not adopt
xtask by default.**

| Situation | Recommended entry point | Why |
| --- | --- | --- |
| `cargo build` / `cargo test` (+ documented feature/profile flags) already cover the need | Plain `cargo` commands | No automation layer needed; xtask would only add indirection over what Cargo already does natively. |
| A short, Unix-shell-only script solves it and native Windows support is not required | A `.sh` script (or Make target calling it) | Simpler to read/maintain than a Rust binary; xtask's main advantage (no shell dependency) does not apply if Windows/no-shell portability is not a requirement. |
| Native Windows support is required, or the automation is non-trivial (multi-step orchestration, structured error handling, needs Rust libraries) | `cargo xtask` | This is the case the pattern exists for: cross-platform automation without depending on a POSIX shell. |
| The project already has `just` / `Task` (Taskfile) covering this need | Keep the existing tool | Do not force a migration to xtask (or to Make) just because this skill documents it; migrating a working, adopted task runner is a separate, explicitly-approved decision — see `references/architecture/selection-and-migration.md`. |

Root cause for the "don't force it" stance: xtask exists to fill a gap (native cross-platform
scripting without a shell) that many crates simply do not have. Introducing an `xtask` binary
crate, workspace member, and `.cargo/config.toml` alias is added surface area (another crate to
compile, another place bugs can hide, another thing contributors must learn) that is only worth
it once the gap is real.

## Windows considerations

- The entire motivation for reaching past a `.sh` script into `xtask` is usually "this must run
  the same way on native Windows (cmd.exe/PowerShell) as it does on Unix shells." A Rust binary
  run via `cargo xtask ...` sidesteps needing a POSIX-compatible shell (Git Bash, WSL, etc.) on
  the Windows box.
- This does not remove OS differences from the *tasks themselves* — path separators, line
  endings, executable extensions (`.exe`), and environment variable syntax differences are still
  the xtask implementation's responsibility to handle; xtask only removes the shell-language
  difference (Bash vs. cmd.exe/PowerShell), it does not automatically make a task
  cross-platform.
- If Windows support is required and the xtask binary in turn shells out to platform tools
  (e.g. a linter that behaves differently on Windows), that dependency must be verified on
  Windows specifically — do not report Windows support as validated from Unix-only testing.

## Notes

- This page documents a **Design guidance / community pattern**, clearly separated from the
  Source-backed Cargo Book material in `crate-and-workspace-profiles.md`. Nothing here is an
  official Cargo subcommand or Cargo Book-defined behavior.
- `cargo xtask` requires the `[alias]` entry to exist in that specific workspace; it is not a
  global Cargo feature and will not work in a workspace that has not defined the alias.
- Exit-code propagation, argument parsing, and task dispatch shown in the sketch above are this
  page's own minimal illustration, not a transcription of any single real `xtask/src/main.rs`.

## Related

- [Crate and Workspace Profiles](./crate-and-workspace-profiles.md)
- [Selection and Migration](../architecture/selection-and-migration.md) (this skill's design
  guidance on Makefile vs. xtask vs. just/Task selection and migration criteria)
