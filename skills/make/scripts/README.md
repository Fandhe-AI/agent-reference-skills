# scripts

| Name | Description | Path |
| --- | --- | --- |
| make-commands | Copy-pasteable GNU Make invocations (`-C`, `-f`, `-j`, `-n`, `-q`, `--trace`, `--output-sync`, `--version`) and version/binary discrimination. | [make-commands.md](./make-commands.md) |
| inspect | `inspect-repo.mjs` — static audit of a target repository's build/config surface (entry points, capability candidates, secret-like filenames, symlinks). | [inspect.md](./inspect.md) |
| plan-and-preview | `validate-plan.mjs` (plan shape/escape/conflict validation) and `preview-sample.mjs` (sample-vs-target diff preview). | [plan-and-preview.md](./plan-and-preview.md) |
| verify | `verify-layout.mjs` (static help/target/skill-path consistency) and `run-checks.mjs` (approved-plan command execution, default dry-run), plus the regression test command. | [verify.md](./verify.md) |
