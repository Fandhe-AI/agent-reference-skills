# Package and Task Graph

## Usage

**Package Graph** — the foundational monorepo structure created by the package manager. When internal packages install each other, Turborepo automatically identifies the dependency relationships between them.

**Task Graph** — the relationships between tasks defined in `turbo.json`. The underlying data structure is a directed acyclic graph (DAG):

- Nodes = tasks
- Edges = task dependencies
- An edge from Task A to Task B means "A depends on B"

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

## Notes

- **Transit nodes** — a package with no implementation of a given task can still be included in the task graph if a package it depends on has that task. For example, if `ui` has no `build` task but `ui` depends on `core`, which does have a `build` task, `ui` is treated as a "transit node" (it runs nothing itself, but still exists on the graph).
- A configuration like `"dependsOn": ["^test"]` triggers the build of dependencies even for a package that has no `build` task itself.

## Related

- [Package Types](./package-types.md)
