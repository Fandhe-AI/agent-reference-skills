---
source: https://docs.astral.sh/uv/concepts/resolution/
---

# Resolution

Resolution is the process of taking a list of requirements and converting them to a list of package versions that fulfill the requirements. Resolution requires recursively searching for compatible versions of packages, ensuring that the requested requirements are fulfilled and that the requirements of the requested packages are compatible.

## Dependencies

Most projects and packages have dependencies. Dependencies are other packages that are necessary in order for the current package to work. A package defines its dependencies as _requirements_, roughly a combination of a package name and acceptable versions. The dependencies defined by the current project are called _direct dependencies_. The dependencies added by each dependency of the current project are called _indirect_ or _transitive dependencies_.

See the dependency specifiers page in the Python Packaging documentation (https://packaging.python.org/en/latest/specifications/dependency-specifiers/) for details about dependencies.

## Basic examples

Consider the following dependencies:

- The project depends on `foo` and `bar`.
- `foo` has one version, 1.0.0:
  - `foo 1.0.0` depends on `lib>=1.0.0`.
- `bar` has one version, 1.0.0:
  - `bar 1.0.0` depends on `lib>=2.0.0`.
- `lib` has two versions, 1.0.0 and 2.0.0. Both versions have no dependencies.

The resolver must find a set of package versions which satisfies the project requirements. Since there is only one version of both `foo` and `bar`, those will be used. The resolution must also include the transitive dependencies, so a version of `lib` must be chosen. `foo 1.0.0` allows all available versions of `lib`, but `bar 1.0.0` requires `lib>=2.0.0` so `lib 2.0.0` must be used.

In some resolutions, there may be more than one valid solution. Consider the following dependencies:

- The project depends on `foo` and `bar`.
- `foo` has two versions, 1.0.0 and 2.0.0:
  - `foo 1.0.0` has no dependencies.
  - `foo 2.0.0` depends on `lib==2.0.0`.
- `bar` has two versions, 1.0.0 and 2.0.0:
  - `bar 1.0.0` has no dependencies.
  - `bar 2.0.0` depends on `lib==1.0.0`
- `lib` has two versions, 1.0.0 and 2.0.0. Both versions have no dependencies.

Some version of both `foo` and `bar` must be selected; however, determining which version requires considering the dependencies of each version of `foo` and `bar`. `foo 2.0.0` and `bar 2.0.0` cannot be installed together as they conflict on their required version of `lib`, so the resolver must select either `foo 1.0.0` (along with `bar 2.0.0`) or `bar 1.0.0` (along with `foo 2.0.0`). Both are valid solutions, and different resolution algorithms may yield either result.

## Signature / Usage

```console
$ uv lock
$ uv pip compile requirements.in -o requirements.txt
```

## Dependency preferences

If resolution output file exists, i.e., a uv lockfile (`uv.lock`) or a requirements output file (`requirements.txt`), uv will _prefer_ the dependency versions listed there. Similarly, if installing a package into a virtual environment, uv will prefer the already installed version if present. This means that locked or installed versions will not change unless an incompatible version is requested or an upgrade is explicitly requested with `--upgrade`.

## Notes

- For the internals of the resolver, see [resolver-internals.md](./resolver-internals.md).

## Related

- [platform-markers.md](./platform-markers.md)
- [resolution-strategy.md](./resolution-strategy.md)
- [resolver-internals.md](./resolver-internals.md)
