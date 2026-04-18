# Command Line Applications in Rust

Reference for the [Command Line Applications in Rust](https://rust-cli.github.io/book/) book — covering project setup, argument parsing, output, testing, packaging, and in-depth topics.

| Name | Description | Path |
|------|-------------|------|
| Project Setup | Bootstrap a new CLI project with `cargo new` | [./project-setup.md](./project-setup.md) |
| Parsing Arguments | Parse typed CLI arguments with `clap` derive | [./parsing-arguments.md](./parsing-arguments.md) |
| Error Handling | Propagate errors with `?`, `anyhow`, and `thiserror` | [./error-handling.md](./error-handling.md) |
| Output for Humans | `println!`, progress bars, logging (`log` + `env_logger`) | [./human-communication.md](./human-communication.md) |
| Output for Machines | Terminal detection, JSON output, stdin piping | [./machine-communication.md](./machine-communication.md) |
| Testing | Unit tests with `impl Write`, integration tests with `assert_cmd` | [./testing.md](./testing.md) |
| Packaging and Distribution | `cargo publish`, pre-built binaries, OS package managers | [./packaging-distribution.md](./packaging-distribution.md) |
| Config Files | Persist settings with `confy` | [./config-files.md](./config-files.md) |
| In-Depth: Signal Handling | Handle Ctrl+C and Unix signals (`ctrlc`, `signal-hook`) | [./in-depth-signal-handling.md](./in-depth-signal-handling.md) |
| In-Depth: Exit Codes | Emit meaningful exit codes with `exitcode` crate | [./in-depth-exit-code.md](./in-depth-exit-code.md) |
| In-Depth: Human Communication | Log levels, progress steps, `human-panic`, man pages | [./in-depth-human-communication.md](./in-depth-human-communication.md) |
