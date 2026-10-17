---
source: https://docs.astral.sh/uv/concepts/resolution/#dependency-constraints
---

# Constraints, overrides and exclusions

Constraints narrow acceptable versions, overrides replace declared requirements, and exclusions remove packages from the dependency graph.

## Signature / Usage

```toml
[tool.uv]
override-dependencies = [
    "foo>1",
    { package = { name = "bar", version = "0.0.5" }, dependencies = ["foo>2"] },
]
exclude-dependencies = ["foo"]
```

## Dependency constraints

Like pip, uv supports constraint files (`--constraint constraints.txt`) which narrow the set of acceptable versions for the given packages. Constraint files are similar to requirements files, but being listed as a constraint alone will not cause a package to be included to the resolution. Instead, constraints only take effect if a requested package is already pulled in as a direct or transitive dependency. Constraints are useful for reducing the range of available versions for a transitive dependency. They can also be used to keep a resolution in sync with some other set of resolved versions, regardless of which packages are overlapping between the two.

## Dependency overrides

Dependency overrides allow bypassing unsuccessful or undesirable resolutions by overriding a package's declared dependencies. Overrides are a useful last resort for cases in which you _know_ that a dependency is compatible with a certain version of a package, despite the metadata indicating otherwise.

For example, if a transitive dependency declares the requirement `pydantic>=1.0,<2.0`, but _does_ work with `pydantic>=2.0`, the user can override the declared dependency by including `pydantic>=1.0,<3` in the overrides, thereby allowing the resolver to choose a newer version of `pydantic`.

Concretely, if `pydantic>=1.0,<3` is included as an override, uv will ignore all declared requirements on `pydantic`, replacing them with the override. In the above example, the `pydantic>=1.0,<2.0` requirement would be ignored completely, and would instead be replaced with `pydantic>=1.0,<3`.

While constraints can only _reduce_ the set of acceptable versions for a package, overrides can _expand_ the set of acceptable versions, providing an escape hatch for erroneous upper version bounds. As with constraints, global overrides do not add a dependency on the package and only take effect if the package is requested in a direct or transitive dependency.

In a `pyproject.toml`, use `tool.uv.override-dependencies` to define a list of overrides. In the pip-compatible interface, the `--override` option can be used to pass files with the same format as constraints files.

By default, an override applies to every requirement for the named dependency, including direct requirements. An override can instead be scoped to the dependencies of a particular package version by using an inline table (see the snippet above).

In this example, `foo>1` is the global override, while `foo>2` replaces requirements for `foo` declared by `bar==0.0.5`. If `bar` does not declare a dependency on `foo`, the scoped override adds it. Other dependencies declared by `bar` are unchanged. The `version` field in `package` can be omitted to apply the scoped overrides to all versions of `bar`. A version-specific entry takes precedence over an all-versions entry, and a scoped override takes precedence over a global override for the same dependency.

Scoped overrides currently support registry version specifiers only. Direct URL and path sources, including Git sources, and explicit indexes are not supported.

Under the `explicit` pre-release mode, an explicit pre-release specifier in any scoped override permits stable-first pre-release fallback for that package for the entire resolution. Similarly, an exact yanked-version pin in any scoped override opts that package into yanked-version candidate selection for the entire resolution, even if the scope is not selected.

If multiple overrides are provided for the same package, they must be differentiated with markers. If a package has a dependency with a marker, it is replaced unconditionally when using overrides — it does not matter if the marker evaluates to true or false.

## Dependency exclusions

Dependency exclusions remove packages from the dependency graph. By default, an exclusion applies to every requirement for the named dependency, including direct requirements:

```toml
[tool.uv]
exclude-dependencies = ["foo"]
```

An exclusion can instead be scoped to the dependencies of a particular package version:

```toml
[tool.uv]
exclude-dependencies = [
    { package = { name = "bar", version = "0.0.5" }, dependencies = ["foo"] },
]
```

In this example, requirements for `foo` declared by `bar==0.0.5` are removed, while requirements for `foo` from other packages are unchanged. The `version` field in `package` can be omitted to apply the scoped exclusions to all versions of `bar`. A version-specific entry takes precedence over an all-versions entry.

Scoped exclusions can be combined with scoped overrides to replace one dependency with another:

```toml
[tool.uv]
override-dependencies = [
    { package = { name = "bar", version = "0.0.5" }, dependencies = ["pytorch-lightning"] },
]
exclude-dependencies = [
    { package = { name = "bar", version = "0.0.5" }, dependencies = ["lightning"] },
]
```

If the same dependency is both overridden and excluded in a matching scope, the exclusion takes precedence.

## Related

- [platform-markers.md](./platform-markers.md)
- [dependency-metadata.md](./dependency-metadata.md)
- [conflicting-dependencies.md](./conflicting-dependencies.md)
