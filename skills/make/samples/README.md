# samples

| Name | Description | Path |
| --- | --- | --- |
| Incremental Build | Make owns the file dependency graph and incremental rebuild decisions directly, instead of aggregating another tool's commands | [incremental-build.md](./incremental-build.md) |
| Rust Crate | A small, Node-free library crate where the Makefile is a thin, optional entry point over `scripts/*.sh` and plain `cargo` commands | [rust-crate.md](./rust-crate.md) |
| Rust Virtual Workspace + xtask | A virtual Cargo workspace whose automation entry point is `cargo xtask`, a plain Cargo alias — deliberately with no Makefile at all | [rust-workspace-xtask.md](./rust-workspace-xtask.md) |
| Node.js + pnpm | A pnpm workspace where `package.json`'s `scripts` field is the source of truth and the Makefile is a thin, non-destructive entry point | [node-pnpm.md](./node-pnpm.md) |
| Mixed Rust + Node | A root Makefile that delegates into Cargo and pnpm/Node separately, and expresses their one real hand-off as an actual Make prerequisite | [mixed.md](./mixed.md) |
| CI Pipeline | Inert templates for a target project's CI that call the same `make verify`/`make check` contract a developer shell and Git hook already use | [ci.md](./ci.md) |
| Adoption Plans | Example JSON plans describing a proposed Make adoption/integration for a target project, checked before any `apply` step | [plans.md](./plans.md) |
