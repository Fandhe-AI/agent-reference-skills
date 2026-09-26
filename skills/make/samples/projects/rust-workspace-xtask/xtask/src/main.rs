//! `xtask`: minimal, std-only task runner for this sample workspace.
//!
//! ## Entry point
//!
//! - `cargo xtask <task> [-- extra-args]` — the normal, documented entry
//!   point. The alias is defined in `.cargo/config.toml`
//!   (`xtask = "run --package xtask --"`), so it expands to
//!   `cargo run --package xtask -- <task> [extra-args]`.
//! - `cargo run -p xtask -- <task>` — equivalent, explicit form (works even
//!   if the `.cargo/config.toml` alias is ever renamed or unavailable).
//!
//! Both forms are plain `cargo` invocations; no separate binary needs to be
//! installed, and no shell script (`.sh` / `.ps1` / `.cmd`) wraps this.
//!
//! ## Design
//!
//! `xtask` is a *thin delegator*, not a build system: every task below maps
//! to one `cargo <subcommand> --workspace --exclude xtask` invocation
//! against this workspace's product crates (`crates/core`, `crates/cli`).
//! It intentionally does not reimplement dependency graphs, caching, or
//! incremental rebuilds — Cargo already owns all of that. See the
//! `[workspace]` table comment in the workspace root `Cargo.toml` for why
//! `xtask` itself is a workspace member but excluded from
//! `default-members`.
//!
//! This keeps the pattern aligned with the cargo-xtask convention
//! (https://github.com/matklad/cargo-xtask): xtask exists for the cases
//! plain `cargo` subcommands can't express directly (multi-step sequences,
//! OS-specific glue, anything a Makefile might otherwise be asked to do),
//! while staying inside `cargo` itself — no Make, no shell, no extra
//! toolchain required to run it.
//!
//! ## Supported tasks
//!
//! - `build` → `cargo build --workspace --exclude xtask`
//! - `test`  → `cargo test  --workspace --exclude xtask`
//! - `check` → `cargo check --workspace --exclude xtask`
//! - `help` / `--help` / `-h` → prints usage, does not invoke `cargo`
//!
//! Anything after the task name is forwarded verbatim to the delegated
//! `cargo` invocation as an argument vector (never through a shell), e.g.
//! `cargo xtask test -- --nocapture` runs
//! `cargo test --workspace --exclude xtask -- --nocapture`.
//!
//! ## Exit code contract
//!
//! This process exits with exactly the delegated `cargo` subprocess's exit
//! code (propagated via `std::process::exit`/`ExitCode`), so e.g.
//! `cargo xtask test` fails (and fails CI) exactly when the underlying
//! `cargo test --workspace --exclude xtask` would fail. An unrecognized
//! task or missing task name exits `2` (usage error) without invoking
//! `cargo` at all. Failure to even launch `cargo` (e.g. not on `PATH`)
//! exits `127`. A child process killed by a signal (Unix-only concept; has
//! no exit code) is mapped to exit `1` rather than panicking.
//!
//! ## Windows
//!
//! This file only uses `std::process::Command` to invoke the `cargo`
//! program resolved via `PATH`/`Path` search, with an explicit argument
//! vector — it does not spawn any Unix-only shell (`sh`/`bash`), assume
//! forward-slash-only paths, or rely on any Unix-specific environment
//! variable. `std::process::Command` resolves `"cargo"` to `cargo.exe` via
//! the standard Windows executable search rules on that platform. On that
//! basis this is *designed* to run unchanged on native Windows (PowerShell,
//! cmd.exe, or a Windows terminal running this via `cargo xtask ...`).
//!
//! It has **not** been executed or verified on native Windows in the
//! environment this sample was authored and tested in (macOS, GNU Make
//! 3.81, cargo 1.98.1 — see `samples/rust-workspace-xtask.md` for the
//! exact verification log). Treat Windows support as "designed for,
//! unverified" — a contributor who actually runs `cargo xtask build` /
//! `cargo xtask test` on native Windows should update this comment (and
//! the sample's description page) with the result rather than assuming it
//! from this rationale alone.

use std::env;
use std::io;
use std::process::{Command, ExitCode};

fn main() -> ExitCode {
    let mut args = env::args().skip(1);
    let task = match args.next() {
        Some(task) => task,
        None => {
            eprintln!("xtask: missing <task> argument\n");
            print_help();
            return ExitCode::from(2);
        }
    };
    let forwarded_args: Vec<String> = args.collect();

    match task.as_str() {
        "build" => delegate("build", &forwarded_args),
        "test" => delegate("test", &forwarded_args),
        "check" => delegate("check", &forwarded_args),
        "help" | "--help" | "-h" => {
            print_help();
            ExitCode::SUCCESS
        }
        other => {
            eprintln!("xtask: unknown task '{other}'\n");
            print_help();
            ExitCode::from(2)
        }
    }
}

/// Runs `cargo <subcommand> --workspace --exclude xtask <forwarded_args>`
/// and maps the result onto this process's `ExitCode`.
///
/// `--exclude xtask` is passed explicitly (rather than relying solely on
/// `default-members` in the workspace `Cargo.toml`) so the scoping contract
/// holds even if a caller's `forwarded_args` happens to include
/// `--workspace` again, or if `default-members` is ever changed — the
/// exclusion is spelled out at the call site that actually matters.
fn delegate(subcommand: &str, forwarded_args: &[String]) -> ExitCode {
    match run_cargo(subcommand, forwarded_args) {
        Ok(code) => ExitCode::from(to_exit_code(code)),
        Err(err) => {
            eprintln!("xtask: failed to launch `cargo {subcommand}`: {err}");
            ExitCode::from(127)
        }
    }
}

/// Maps a raw child exit code (`i32`, as returned by `ExitStatus::code()`)
/// onto the `u8` range `ExitCode::from` requires, WITHOUT ever mapping a
/// nonzero/abnormal code to `0` (success).
///
/// This matters specifically on Windows: an unhandled-exception / crash
/// exit code from a Windows process (NTSTATUS values such as
/// `0xC0000005` "access violation" or `0xC000013A` "Ctrl-C") is reported
/// by the OS as a large *positive* `u32`, which `ExitStatus::code()`
/// re-interprets as a **negative** `i32` on the Rust side. A naive
/// `code.clamp(0, 255) as u8` would clamp any such negative value to `0`
/// — i.e. it would silently convert a Windows crash into `ExitCode::SUCCESS`,
/// which is exactly the "failure turned into success" outcome §10 of the
/// skill's design brief forbids and that this crate's own module doc
/// promises never happens. On Unix, `ExitStatus::code()` is already
/// guaranteed to be in `0..=255`, so this function is a no-op there; the
/// branch below exists for the Windows case and any other out-of-range
/// input.
fn to_exit_code(code: i32) -> u8 {
    match code {
        0 => 0,
        1..=255 => code as u8,
        // Negative (e.g. Windows NTSTATUS-derived) or >255 codes: never
        // treat as success. Reported as generic failure (1) rather than
        // attempting a lossy/ambiguous remap of the original value.
        _ => 1,
    }
}

/// Spawns `cargo <subcommand> --workspace --exclude xtask` plus
/// `forwarded_args`, waits for it, and returns its exit code.
///
/// Uses an explicit argument vector throughout (`Command::arg`/`args`) —
/// never a shell string that would need escaping/quoting, and never
/// `eval`-style string interpretation of `forwarded_args`.
fn run_cargo(subcommand: &str, forwarded_args: &[String]) -> io::Result<i32> {
    let mut cmd = Command::new("cargo");
    cmd.arg(subcommand)
        .arg("--workspace")
        .arg("--exclude")
        .arg("xtask")
        .args(forwarded_args);

    let status = cmd.status()?;

    // `ExitStatus::code()` is `None` only when the child was terminated by a
    // signal (Unix-only). Map that to a generic failure code (1) rather than
    // panicking or treating it as success.
    Ok(status.code().unwrap_or(1))
}

fn print_help() {
    println!("cargo xtask <task> [-- extra-args]");
    println!();
    println!("Tasks:");
    println!("  build   cargo build --workspace --exclude xtask");
    println!("  test    cargo test  --workspace --exclude xtask");
    println!("  check   cargo check --workspace --exclude xtask");
    println!("  help    show this message (does not invoke cargo)");
    println!();
    println!("Extra arguments after the task are forwarded verbatim, e.g.:");
    println!("  cargo xtask test -- --nocapture");
    println!("runs:");
    println!("  cargo test --workspace --exclude xtask -- --nocapture");
}

#[cfg(test)]
mod tests {
    // These are compile-time/logic sanity checks only (no subprocess
    // spawning here — that is exercised by actually running `cargo xtask
    // build|test|check`, recorded in samples/rust-workspace-xtask.md).
    // Run with `cargo test -p xtask`.

    use super::to_exit_code;

    #[test]
    fn to_exit_code_passes_through_normal_range() {
        assert_eq!(to_exit_code(0), 0);
        assert_eq!(to_exit_code(1), 1);
        assert_eq!(to_exit_code(101), 101); // cargo's standard "test/build failed" code
        assert_eq!(to_exit_code(255), 255);
    }

    #[test]
    fn to_exit_code_never_maps_a_nonzero_code_to_success() {
        // Negative codes (e.g. Windows NTSTATUS-derived crash codes surfaced
        // as negative i32 by ExitStatus::code()) must NOT become 0.
        assert_ne!(to_exit_code(-1), 0);
        assert_ne!(to_exit_code(-1073741819), 0); // 0xC0000005 as i32
        assert_ne!(to_exit_code(300), 0);
    }
}
