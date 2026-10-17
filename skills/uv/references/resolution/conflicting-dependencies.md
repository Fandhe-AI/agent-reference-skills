---
source: https://docs.astral.sh/uv/concepts/resolution/#conflicting-dependencies
---

# Conflicting dependencies

uv resolves all extras, dependency groups and workspace members together; `tool.uv.conflicts` declares sets that are allowed to conflict.

## Signature / Usage

```toml title="pyproject.toml"
[tool.uv]
conflicts = [
    [
      { extra = "extra1" },
      { extra = "extra2" },
    ],
]
```

## Conflicting dependencies

uv requires that all dependencies declared by a project are compatible with each other and resolves all dependencies together when creating the lockfile. This includes project dependencies, optional dependencies ("extras"), and dependency groups (development dependencies).

If dependencies declared in one extra are not compatible with those in another extra, uv will fail to resolve the requirements of the project with an error. For example, consider two sets of optional dependencies that conflict with one another:

```toml title="pyproject.toml"
[project.optional-dependencies]
extra1 = ["numpy==2.1.2"]
extra2 = ["numpy==2.0.0"]
```

If you run `uv lock` with the above dependencies, resolution will fail:

```console
$ uv lock
  x No solution found when resolving dependencies:
  `-> Because myproject[extra2] depends on numpy==2.0.0 and myproject[extra1] depends on numpy==2.1.2, we can conclude that myproject[extra1] and
      myproject[extra2] are incompatible.
      And because your project requires myproject[extra1] and myproject[extra2], we can conclude that your projects's requirements are unsatisfiable.
```

To work around this, uv supports explicit declaration of conflicts. If you specify that `extra1` and `extra2` are conflicting, uv will resolve them separately (use the `tool.uv` snippet above). Now, running `uv lock` will succeed. However, now you cannot install both `extra1` and `extra2` at the same time:

```console
$ uv sync --extra extra1 --extra extra2
Resolved 3 packages in 14ms
error: extra `extra1`, extra `extra2` are incompatible with the declared conflicts: {`myproject[extra1]`, `myproject[extra2]`}
```

This error occurs because installing both `extra1` and `extra2` would result in installing two different versions of a package into the same environment.

The same strategy works with dependency groups; use the `group` key instead of `extra`:

```toml title="pyproject.toml"
[dependency-groups]
group1 = ["numpy==2.1.2"]
group2 = ["numpy==2.0.0"]

[tool.uv]
conflicts = [
    [
      { group = "group1" },
      { group = "group2" },
    ],
]
```

When using a workspace with multiple projects, the same restrictions apply — uv requires all workspace members to be compatible with each other. Similarly, conflicts can be declared across workspace members.

For example, consider the following workspace:

```toml title="member1/pyproject.toml"
[project]
name = "member1"

[project.optional-dependencies]
extra1 = ["numpy==2.1.2"]
```

```toml title="member2/pyproject.toml"
[project]
name = "member2"

[project.optional-dependencies]
extra2 = ["numpy==2.0.0"]
```

To declare a conflict between extras in these different workspace members, use the `package` key:

```toml title="pyproject.toml"
[tool.uv]
conflicts = [
    [
      { package = "member1", extra = "extra1" },
      { package = "member2", extra = "extra2" },
    ],
]
```

It's also possible for the project dependencies (i.e., `project.dependencies`) of one workspace member to conflict with the extra of another member (`member1` with `dependencies = ["numpy==2.1.2"]`, `member2` with `extra2 = ["numpy==2.0.0"]`). This conflict can also be declared using the `package` key:

```toml title="pyproject.toml"
[tool.uv]
conflicts = [
    [
      { package = "member1" },
      { package = "member2", extra = "extra2" },
    ],
]
```

Similarly, it's possible for some workspace members to have conflicting project dependencies (`member1` with `dependencies = ["numpy==2.1.2"]`, `member2` with `dependencies = ["numpy==2.0.0"]`). This conflict can also be declared using the `package` key:

```toml title="pyproject.toml"
[tool.uv]
conflicts = [
    [
      { package = "member1" },
      { package = "member2" },
    ],
]
```

These workspace members will not be installable together, e.g., the workspace root cannot define:

```toml title="pyproject.toml"
[project]
name = "root"
dependencies = ["member1", "member2"]
```

## Notes

- Conflict entries use the keys `extra`, `group`, and `package`.
- Declared-conflicting extras or groups cannot be installed together.

## Related

- [constraints-overrides-exclusions.md](./constraints-overrides-exclusions.md)
- [resolution-environments.md](./resolution-environments.md)
