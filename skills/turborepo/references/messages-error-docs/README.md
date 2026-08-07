# Messages Error Docs

| Name | Description | Path |
|------|-------------|------|
| Invalid environment variable prefix | Error raised when an environment variable in `turbo.json` is declared with a leading `$`, a syntax deprecated since Turborepo 1.5. | [invalid-env-prefix.md](./invalid-env-prefix.md) |
| Missing root task in turbo.json | Error raised when a task depends on a root package script (via `//#<task>`) that is not registered in `turbo.json`. | [missing-root-task-in-turbo-json.md](./missing-root-task-in-turbo-json.md) |
| Package task in single-package workspace error | Error raised when a `turbo.json` in a single-package workspace declares a task using package-scoped syntax (`<package>#<task>`). | [package-task-in-single-package-workspace.md](./package-task-in-single-package-workspace.md) |
| Recursive `turbo` invocations | Error raised when Turborepo detects a cycle of `turbo` invocations in a single-package workspace, which would otherwise loop infinitely. | [recursive-turbo-invocations.md](./recursive-turbo-invocations.md) |
| Unnecessary package task syntax error | Error raised when a package-level `turbo.json` (used for Workspace Configurations) declares a task using `package#task` syntax instead of the plain task name. | [unnecessary-package-task-syntax.md](./unnecessary-package-task-syntax.md) |
